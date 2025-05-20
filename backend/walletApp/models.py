from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
import uuid

from appointments.models import Appointment
# Create your models here.
User = get_user_model()


class Wallet(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        User,
        null=True,
        on_delete=models.CASCADE,
        limit_choices_to={"is_medical_staff": True},
    )
    currency = models.CharField(max_length=50, default="KES")
    appointment_fee = models.DecimalField(max_digits=30, decimal_places=2, default=2500.00)
    created_at = models.DateTimeField(default=timezone.now, null=True)

    def __str__(self):
        return self.user.__str__()


class WalletTransaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    TRANSACTION_TYPES = (
        ("deposit", "deposit"),
        # ("transfer", "transfer"),
        # ("withdraw", "withdraw"),
    )
    STATUS = (
        ("pending", "pending"),
        ("success", "success"),
        ("failed", "failed"),
    )
    wallet = models.ForeignKey(Wallet, null=True, on_delete=models.DO_NOTHING)
    paying_user = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name="paying_user")
    transaction_type = models.CharField(max_length=200, null=True, choices=TRANSACTION_TYPES)
    appointment = models.ForeignKey(
        Appointment, null=True, on_delete=models.DO_NOTHING, related_name="appointment"
    )
    amount = models.DecimalField(max_digits=100, null=True, decimal_places=2)
    timestamp = models.DateTimeField(default=timezone.now, null=True)
    status = models.CharField(max_length=100, default="pending", choices=STATUS)
    paystack_payment_reference = models.CharField(
        max_length=100, default="", blank=True
    )

    def __str__(self):
        return self.wallet.user.__str__()

