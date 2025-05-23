from rest_framework import serializers
from django.contrib.auth import get_user_model
from util.errors.exceptionhandler import CustomInternalServerError
from util.messages.hundle_messages import success_response
from walletApp.models import Wallet, WalletTransaction
from walletApp.services import initialize_payment
from .models import  Appointment, Treatment
from rest_framework import status
from django.utils import timezone

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = [
            'id',
            'patient',
            'medical_staff',
            'start_time',
            'end_time',
            'is_active',
            'duration',
            'status',
            'description',
            'cancel_reason',
            'rescheduled_at',
            'reschedule_reason',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'end_time', 'patient']

    def validate(self, attrs):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            User = get_user_model()
            user = User.objects.filter(pk=request.user.pk).first()
            attrs['patient'] = user

        # Check if appointment is in the past
        if attrs['start_time'] < timezone.now():
            raise serializers.ValidationError("Appointment date cannot be in the past.")
        
        # Check if appointment date is more than 30 days in the future
        if attrs['start_time'] > timezone.now() + timezone.timedelta(days=30):
            raise serializers.ValidationError("Appointment date cannot be more than 30 days in the future.")
        
        # Calculate end_time from start_time and duration
        calculated_end_time = attrs['start_time'] + attrs['duration']
        
        # Check for conflicting appointments for the same patient and medical staff
        # Calculate end_time from start_time and duration
        calculated_end_time = attrs['start_time'] + attrs['duration']

        # Set the calculated end_time in attrs so it can be used in create/update
        attrs['end_time'] = calculated_end_time

        # Check for conflicting appointments for this medical staff (excluding cancelled ones)
        conflicting_doctor_appointments = Appointment.objects.filter(
            medical_staff=attrs['medical_staff'],
            start_time__lt=calculated_end_time,  # Existing appointment starts before new one ends
            end_time__gt=attrs['start_time'],    # Existing appointment ends after new one starts'
            is_active=True  
        ).exclude(status='cancelled')

        if conflicting_doctor_appointments.exists():
            raise serializers.ValidationError(
                "Appointment slot unavailable."
            )

        # Check for conflicting appointments for this patient (excluding cancelled ones)
        conflicting_patient_appointments = Appointment.objects.filter(
            patient=attrs['patient'],
            start_time__lt=calculated_end_time,  # Existing appointment starts before new one ends
            end_time__gt=attrs['start_time'],   # Existing appointment ends after new one starts'
            is_active=True
        ).exclude(status='cancelled')

        if conflicting_patient_appointments.exists():
            raise serializers.ValidationError(
                "You already have an appointment during this time period."
            )
            
        return attrs
    
    def create(self, validated_data):
            validated_data.pop('status', None)
            validated_data.pop('is_active', None)
            medical_staff = validated_data['medical_staff']

            # get staff meeting url
            medical_staff = get_user_model().objects.filter(pk=medical_staff.pk).first()
            print(f"Medical staff: {medical_staff}")

            staff_meeting_url = medical_staff.meeting_url 
            print(f"Staff meeting URL: {staff_meeting_url}")

            # Create appointment with is_active=False initially
            appointment = Appointment.objects.create(
                **validated_data,
                is_active=False,
                meeting_url=staff_meeting_url,
                status='new'
            )
            
            # Initialize payment
            wallet = Wallet.objects.filter(user=medical_staff).first()
            if not wallet:
                wallet = Wallet.objects.create(
                        user=medical_staff,
                        currency="KES",  # Default currency
                        appointment_fee=2500.00  # Default appointment fee
                    )
            payment_response = initialize_payment(
                email=validated_data['patient'].email,
                amount=wallet.appointment_fee,
                metadata={
                    'appointment_id': str(appointment.id),
                    'patient_id': str(validated_data['patient'].id),
                    'medical_staff_id': str(medical_staff.id)
                }
              
            )
            
            # Create payment record
            WalletTransaction.objects.create(
                wallet=wallet,
                paying_user=validated_data['patient'],
                transaction_type='deposit',
                amount=wallet.appointment_fee,
                status='pending',
                paystack_payment_reference=payment_response['data']['reference'],
                appointment=appointment
            )
            data = {
                'appointment': appointment.id,
                'payment_url': payment_response['data']['authorization_url']

            }
            response = success_response(
                message_code="Payment initialized successfully",
                status_code=status.HTTP_200_OK,
                message=data
            )
            
            return response
       
class TreatmentSerializer(serializers.ModelSerializer):
    appointment = AppointmentSerializer(read_only=True)
    appointment_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = Treatment
        fields = [
            'id',
            'appointment',
            'appointment_id',
            'diagnosis',
            'prescription',
            'created_at',
            'updated_at',
        ]

    def create(self, validated_data):
        appointment_id = validated_data.pop('appointment_id')
        validated_data['appointment_id'] = appointment_id
        return super().create(validated_data)
