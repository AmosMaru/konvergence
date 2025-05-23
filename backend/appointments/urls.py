from django.urls import path, include
from rest_framework.routers import DefaultRouter

from appointments import views

app_name = 'appointments'
router = DefaultRouter(trailing_slash=False)
router.register(r'appointments', views.AppointmentView, basename='appointments')
# router.register(r'treatments', views.TreatmentView, basename='treatments')

urlpatterns = [
    path('', include(router.urls)),
    ]
