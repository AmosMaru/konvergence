from datetime import datetime, timezone
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTStatelessUserAuthentication
from django.core.files.uploadedfile import InMemoryUploadedFile, TemporaryUploadedFile
from account.models import User
from appointments.models import Appointment
from util.errors.exceptionhandler import CustomInternalServerError
from util.messages.hundle_messages import success_response
from .models import Wallet, WalletTransaction
from .serializers import (
    WalletSerializer,
    WalletTransactionSerializer,
    InitiateDepositSerializer,
    VerifyDepositSerializer,
)
from .services import  verify_payment
# api/views.py
import hmac
import hashlib
import json
from rest_framework.views import APIView
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from util.emails.success_event_registration import send_mail


class CustomView(ModelViewSet):
    pagination_class = PageNumberPagination
    permission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = [JWTStatelessUserAuthentication]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    def create(self, request, *args, **kwargs):
        """
            Handle POST requests to create a new organization by the permitted user.
            :param request: The HTTP request object.
            :param args: Additional arguments.
            :param kwargs: Additional keyword arguments.
            :return: A response indicating the status of the organization creation.
        """
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.create(serializer.validated_data)
            response = success_response(status_code=status.HTTP_200_OK, message_code="upload_data",
                                        message={"message": "Created successfully"})
            return Response(response, status=status.HTTP_201_CREATED)
        except Exception as e:
            raise CustomInternalServerError(
                message=str(e),
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        """
            Get the organization by the unique organization id
            :param request:
            :param args:
            :param kwargs:
            :return:
        """
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            data = serializer.data
            response = success_response(status_code=status.HTTP_200_OK, message_code="get_data", message={"data": data})
            return Response(data=response)
        except Exception as e:
            raise CustomInternalServerError(
                message=str(e),
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def update(self, request, *args, **kwargs):
        """
            Modify the organization information or details
            :param request:
            :param args:
            :param kwargs:
            :return:
        """
        try:
            instance = self.get_object()
            if not instance:
                raise CustomInternalServerError(
                    message="Resource not found.",
                    code="not_found",
                    status_code=status.HTTP_404_NOT_FOUND
                )
            content_type = request.content_type.split(';')[0].strip()

            cleaned_data: dict = {}

            if content_type == 'application/json':
                cleaned_data = request.data
            elif content_type == 'multipart/form-data':
                for key, value in request.data.items():
                    if isinstance(value, list) and len(value) == 1 and not isinstance(value[0], (
                            InMemoryUploadedFile, TemporaryUploadedFile)):
                        # Extract the first element if not a file
                        cleaned_data[key] = value[0]
                    else:
                        cleaned_data[key] = value
                # Add the files to the cleaned_data
                for key, file in request.FILES.items():
                    cleaned_data[key] = file
            else:
                raise CustomInternalServerError(
                    message="Unsupported content type",
                    status_code=status.HTTP_400_BAD_REQUEST
                )

            serializer = self.get_serializer(data=request.data)
            serializer.update(instance, cleaned_data)

            message = "Resource updated successfully"
            data = success_response(status_code=status.HTTP_200_OK, message_code="update_success",
                                    message=message)
            return Response(data=data, status=status.HTTP_200_OK)
        except CustomInternalServerError as api_exec:
            raise api_exec
        except Exception as e:
            raise CustomInternalServerError(
                message=str(e),
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def destroy(self, request, *args, **kwargs):
        """
            Delete resource from the database
            :param request:
            :param args:
            :param kwargs:
            :return:
        """
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            response_data = success_response(status_code=status.HTTP_204_NO_CONTENT, message_code="delete_success",
                                             message="Deleted successfully.")
            return Response(data=response_data, status=status.HTTP_200_OK)

        except Exception as e:
            raise CustomInternalServerError(
                message=str(e),
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class WalletDetailView(generics.RetrieveAPIView):
    serializer_class = WalletSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Get or create wallet for the authenticated user
        wallet, created = Wallet.objects.get_or_create(user=self.request.user)
        return wallet

class InitiateDepositView(CustomView):
    serializer_class = InitiateDepositSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        """
        Override the create method to return the serializer's response data
        """
        try:
            serializer = self.get_serializer(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            response_data = serializer.create(validated_data=serializer.validated_data)
            
            # Return the response data from the serializer directly
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            raise CustomInternalServerError(
                message=str(e),
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
class VerifyDepositView(generics.CreateAPIView):
    serializer_class = VerifyDepositSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        reference = serializer.validated_data['reference']

        try:
            transaction = WalletTransaction.objects.get(
                paystack_payment_reference=reference,
                paying_user=request.user
            )
        except WalletTransaction.DoesNotExist:
            return Response(
                {"error": "Transaction not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )

        # If already verified, return current status
        if transaction.status == 'success':
            return Response({
                "status": "success",
                "message": "Transaction already verified",
                "transaction": WalletTransactionSerializer(transaction).data
            })

        # Verify payment with Paystack
        verification_response = verify_payment(reference)

        if not verification_response or not verification_response.get('status'):
            return Response(
                {"error": "Verification failed"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Update transaction status based on Paystack response
        if verification_response['data']['status'] == 'success':
            transaction.status = 'success'
            transaction.save()
            return Response({
                "status": "success",
                "message": "Payment verified successfully",
                "transaction": WalletTransactionSerializer(transaction).data
            })
        else:
            transaction.status = 'failed'
            transaction.save()
            return Response({
                "status": "failed",
                "message": "Payment verification failed",
                "transaction": WalletTransactionSerializer(transaction).data
            })

class TransactionHistoryView(CustomView):
    queryset = WalletTransaction.objects.all()
    serializer_class = WalletTransactionSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']

    

@method_decorator(csrf_exempt, name='dispatch')
class PaystackWebhookView(APIView):
    """
    Handle Paystack webhook events
    """
    def post(self, request, *args, **kwargs):
        # Verify signature
        paystack_signature = request.headers.get('x-paystack-signature')
        if not paystack_signature:
            return Response(
                {"error": "No signature header"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        secret_key = settings.PAYSTACK_SECRET_KEY
        body = request.body.decode('utf-8')
        computed_signature = hmac.new(
            secret_key.encode('utf-8'),
            body.encode('utf-8'),
            digestmod=hashlib.sha512
        ).hexdigest()

        if not hmac.compare_digest(computed_signature, paystack_signature):
            return Response(
                {"error": "Invalid signature"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            event_data = json.loads(body)
            event_type = event_data.get('event')
            data = event_data.get('data', {})

            # Process different event types
            if event_type == 'charge.success':
                return self.handle_charge_success(data)
            elif event_type == 'transfer.success':
                return self.handle_transfer_success(data)
            elif event_type == 'subscription.create':
                return self.handle_subscription_create(data)
            # Add more event handlers as needed

            return Response(
                {"message": "Webhook received but no handler for this event type"},
                status=status.HTTP_200_OK
            )

        except json.JSONDecodeError:
            return Response(
                {"error": "Invalid JSON payload"},
                status=status.HTTP_400_BAD_REQUEST
            )

    def handle_charge_success(self, data):
        """
        Handle successful charge event
        """
    
        reference = data.get('reference')
        
        try:
            # Verify transaction
            transaction = WalletTransaction.objects.filter(
                paystack_payment_reference=reference
            ).first()

            print("transaction", transaction)
            
            if not transaction:
                return Response(
                    {"error": "Transaction not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
                
            if transaction.status == 'success':
                return Response(
                    {"message": "Transaction already processed"},
                    status=status.HTTP_200_OK
                )
            
            # Update transaction
            transaction.status = 'success'
            transaction.save()
            
            # Get and update appointment
            if transaction.appointment:
                appointment = transaction.appointment
                appointment.is_active = True
                appointment.save()
                
                print(f"Appointment ID: {appointment.id}")
                print(f"Medical staff email: {appointment.medical_staff.email}")  # Updated access
                print(f"Patient email: {appointment.patient.email}")
                print(f"Meeting URL: {appointment.meeting_url}")
                print(f"Start time: {appointment.start_time}")
                
                try:
                    # Send confirmation notifications
                    send_appointment_confirmation(
                        medical_staff=appointment.medical_staff,  # Should be the staff object
                        patient=appointment.patient,  # Should be the patient object
                        meeting_url=appointment.meeting_url,
                        start_time=appointment.start_time
                    )
                except Exception as e:
                    print(f"Error sending confirmation email: {str(e)}")
                    # Don't fail the whole transaction if email fails
                
                return Response(
                    {"message": "Payment processed and appointment activated"},
                    status=status.HTTP_200_OK
                )
                        
        except CustomInternalServerError as api_exec:
            raise api_exec
        except Exception as e:
            raise CustomInternalServerError(message=str(e))


    def handle_transfer_success(self, data):
        """Handle successful transfer event"""
        # Implement your transfer logic
        return Response(
            {"message": "Transfer successful processed"},
            status=status.HTTP_200_OK
        )

    def handle_subscription_create(self, data):
        """Handle new subscription event"""
        # Implement your subscription logic
        return Response(
            {"message": "Subscription created processed"},
            status=status.HTTP_200_OK
        )


def send_appointment_confirmation(
        medical_staff,
        patient,   
        meeting_url,
        start_time,
        current_year=datetime.now().year) -> None:
    """
    Sends appointment confirmation email to patient and doctor.
    
    Args:
        medical_staff: User object of the medical staff
        patient: User object of the patient
        meeting_url: URL for virtual meeting
        start_time: Datetime object of appointment
    """
    template_name = "appointment_confirmation.html"
    subject = f"Appointment Confirmation - {medical_staff.get_full_name()}"
    
    # Prepare context for email template
    context = {
        'patient_name': patient.get_full_name(),
        'doctor_name': medical_staff.get_full_name(),
        'appointment_date': start_time.strftime("%d %B %Y"),
        'appointment_time': start_time.strftime("%I:%M %p"),   
        'meeting_link': meeting_url,
        'current_year': current_year,
        'is_virtual': True,
        'location': "Virtual Consultation",
        'support_email': "owuorfk@gmail.com",
        'support_phone': "+254 700 000 000",
    }
    
    recipient_list = [patient.email]
    
    # CC the doctor
    if medical_staff.email:
        recipient_list.append(medical_staff.email)
    
    try:
        send_mail(
            subject=subject,
            template_name=template_name,
            context=context,
            recipient_list=recipient_list,
            reply_to=[settings.EMAIL_REPLY_TO]
        )
    except Exception as e:
        print(f"Failed to send appointment confirmation: {str(e)}")
        raise