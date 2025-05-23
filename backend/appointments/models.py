import uuid
from django.db import models
from django.contrib.auth import get_user_model
from datetime import timedelta

USER = get_user_model()

class Appointment(models.Model):
    STATUSES = (
        ('new', 'New'),
        ('in_progress', 'In Progress'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
        ('queried', 'Queried'),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.ForeignKey(
        USER, 
        on_delete=models.CASCADE, 
        related_name='patient_appointments',
        verbose_name='Patient'
    )
    medical_staff = models.ForeignKey(
        USER, 
        on_delete=models.CASCADE, 
        related_name='staff_appointments',
        verbose_name='Medical Staff',
        limit_choices_to={'is_medical_staff': True}
    )
    is_paid = models.BooleanField(default=False, verbose_name='Paid')
    start_time = models.DateTimeField(blank=True, null=True)
    end_time = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=False, verbose_name='Active')
    duration = models.DurationField(default=timedelta(minutes=30), verbose_name='Duration')
    status = models.CharField(max_length=20, choices=STATUSES, default='new', verbose_name='Status')
    description = models.TextField(blank=True, null=True, verbose_name='Reason for Appointment')
    meeting_url = models.CharField(max_length=255, blank=True, null=True, verbose_name='Meeting URL')
    cancel_reason = models.TextField(blank=True, null=True)
    rescheduled_at = models.DateTimeField(blank=True, null=True)
    reschedule_reason = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Appointment'
        verbose_name_plural = 'Appointments'

    def __str__(self):
        return f"Appointment {self.id}"
    

class Treatment(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE, related_name='treatments', verbose_name='Appointment')
    diagnosis = models.TextField(blank=True, null=True, verbose_name='Diagnosis')
    prescription = models.TextField(blank=True, null=True, verbose_name='Prescription')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Treatment'
        verbose_name_plural = 'Treatments'

    def __str__(self):
        return f"Treatment for {self.appointment.patient.get_full_name() or self.appointment.patient.email} on {self.created_at.date()}"