from rest_framework import status
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.authentication import JWTStatelessUserAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from django.core.files.uploadedfile import InMemoryUploadedFile, TemporaryUploadedFile
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from appointments.models import Appointment, Treatment
from appointments.serializers import AppointmentSerializer, TreatmentSerializer
from util.errors.exceptionhandler import CustomInternalServerError
from util.messages.hundle_messages import success_response

# Create your views here.
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



class AppointmentView(CustomView):
    queryset = Appointment.objects.all().order_by('-created_at')
    serializer_class = AppointmentSerializer
    parser_classes = [MultiPartParser, JSONParser, FormParser]
    search_fields = ('^id', '^name', '^patient__name', '^medial_staff__name')
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['medical_staff', 'patient']
    ordering_fields = ['-created_at']


    def create(self, request, *args, **kwargs):
        """
        Override the create method to return the serializer's response data
        """
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        response_data = serializer.create(validated_data=serializer.validated_data)
        # Return the response data from the serializer directly
        return Response(response_data, status=status.HTTP_200_OK)
    
            
class TreatmentView(CustomView):
    queryset = Treatment.objects.all().order_by('-created_at')
    serializer_class = TreatmentSerializer
    search_fields = ('^id', '^name')
    parser_classes = [MultiPartParser, JSONParser, FormParser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    ordering_fields = ['-created_at']
