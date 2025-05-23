from django.contrib import admin
from .models import Appointment, Treatment

class TreatmentInline(admin.StackedInline):
    model = Treatment
    extra = 0
    fields = ('diagnosis', 'prescription', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')
    can_delete = False

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'patient', 'medical_staff', 'start_time', 'meeting_url', 'status', 'is_paid', 'is_active')
    list_filter = ('status', 'is_paid', 'is_active', 'medical_staff')
    search_fields = ('patient__email', 'patient__first_name', 'patient__last_name', 
                    'medical_staff__email', 'medical_staff__first_name', 'medical_staff__last_name')
    readonly_fields = ('id', 'created_at', 'updated_at')
    fieldsets = (
        ('Basic Information', {
            'fields': ('id', 'patient', 'medical_staff', 'status', 'is_paid', 'is_active')
        }),
        ('Timing', {
            'fields': ('start_time', 'end_time', 'duration', 'rescheduled_at')
        }),
        ('Details', {
            'fields': ('description', 'cancel_reason', 'reschedule_reason')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    inlines = [TreatmentInline]

@admin.register(Treatment)
class TreatmentAdmin(admin.ModelAdmin):
    list_display = ('appointment', 'short_diagnosis', 'short_prescription', 'created_at')
    list_filter = ('appointment__medical_staff', 'created_at')
    search_fields = ('appointment__patient__email', 'appointment__patient__first_name',
                    'appointment__patient__last_name', 'diagnosis', 'prescription')
    readonly_fields = ('created_at', 'updated_at')
    
    def short_diagnosis(self, obj):
        return obj.diagnosis[:50] + '...' if obj.diagnosis and len(obj.diagnosis) > 50 else obj.diagnosis
    short_diagnosis.short_description = 'Diagnosis'
    
    def short_prescription(self, obj):
        return obj.prescription[:50] + '...' if obj.prescription and len(obj.prescription) > 50 else obj.prescription
    short_prescription.short_description = 'Prescription'