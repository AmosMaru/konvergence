from django.contrib import admin
from .models import Wallet, WalletTransaction

@admin.register(Wallet)
class WalletAdmin(admin.ModelAdmin):
    list_display = ('user', 'currency', 'appointment_fee', 'created_at')
    list_filter = ('currency', 'created_at')
    search_fields = ('user__email', 'user__first_name', 'user__last_name')
    readonly_fields = ('id', 'created_at')
    fieldsets = (
        (None, {
            'fields': ('id', 'user', 'currency', 'appointment_fee')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )

@admin.register(WalletTransaction)
class WalletTransactionAdmin(admin.ModelAdmin):
    list_display = ('wallet', 'transaction_type', 'amount', 'status', 'timestamp', 'paying_user')
    list_filter = ('transaction_type', 'status', 'timestamp')
    search_fields = (
        'wallet__user__email', 
        'wallet__user__first_name', 
        'wallet__user__last_name',
        'paying_user__email',
        'paying_user__first_name',
        'paying_user__last_name',
        'paystack_payment_reference'
    )
    readonly_fields = ('id', 'timestamp')
    fieldsets = (
        ('Transaction Details', {
            'fields': (
                'id', 
                'wallet', 
                'paying_user',
                'appointment',
                'transaction_type', 
                'amount', 
                'status'
            )
        }),
        ('Payment Information', {
            'fields': ('paystack_payment_reference',),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('timestamp',),
            'classes': ('collapse',)
        }),
    )