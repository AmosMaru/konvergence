from rest_framework import serializers

from util.messages.hundle_messages import success_response
from walletApp.services import initialize_payment
from .models import Wallet, WalletTransaction
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
import uuid
User = get_user_model()

class WalletSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(is_medical_staff=True))
    balance = serializers.SerializerMethodField()
    
    class Meta:
        model = Wallet
        fields = ['id', 'user', 'currency', 'created_at', 'balance']
        read_only_fields = ['id', 'created_at', 'balance']
    
    def get_balance(self, obj):
        # Calculate the wallet balance by summing all successful transactions
        transactions = WalletTransaction.objects.filter(
            wallet=obj, 
            status='success'
        )
        return sum(t.amount for t in transactions)

class WalletTransactionSerializer(serializers.ModelSerializer):
    wallet = serializers.PrimaryKeyRelatedField(queryset=Wallet.objects.all())
    paying_user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    class Meta:
        model = WalletTransaction
        fields = [
            'id', 
            'wallet', 
            'paying_user',
            'transaction_type', 
            'amount', 
            'timestamp', 
            'status', 
            'paystack_payment_reference'
        ]
        read_only_fields = [
            'id', 
            'timestamp', 
            'status', 
            'paystack_payment_reference'
        ]
    
    def validate(self, data):
        # Ensure only deposit transactions are created
        if data.get('transaction_type') != 'deposit':
            raise serializers.ValidationError("Only deposit transactions are allowed.")
        
        # Validate amount is positive
        if data.get('amount') <= 0:
            raise serializers.ValidationError("Amount must be positive.")
        
        return data
    
    # set up webhook to update transaction status
    
class InitiateDepositSerializer(serializers.Serializer):
    medical_staff = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(is_medical_staff=True),
        source='wallet.user',
        write_only=True
    )
    
    def validate(self, data):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            raise serializers.ValidationError("Authentication required")
        
        try:
            # Get the actual User instance from the request
            paying_user = User.objects.get(pk=request.user.id)
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found")
        
        staff_user = data['wallet']['user']
        
        # Get or create wallet for staff user
        wallet, created = Wallet.objects.get_or_create(user=staff_user)
        
        # Add wallet and paying_user to validated data
        data['wallet'] = wallet
        data['paying_user'] = paying_user
        data['amount'] = wallet.appointment_fee  # Add the amount from wallet
        
        # Add email for payment processing
        data['email'] = paying_user.email
        
        return data
    
    def create(self, validated_data):
        print("validated_data", validated_data)
        request = self.context.get('request')
        wallet = validated_data['wallet']
        paying_user = validated_data['paying_user']
        email = validated_data['email']
        amount = validated_data['amount']

       
        
        # Initialize Paystack payment
        try:
            payment_response = initialize_payment(
                email=email,
                amount=amount,
            )
            print("payment_response", payment_response)
        except Exception as e:
            raise serializers.ValidationError(f"Payment initialization failed: {str(e)}")

        payment_reference = payment_response.get('data', {}).get('access_code')
        # Create transaction record
        transaction = WalletTransaction.objects.create(
            wallet=wallet,
            paying_user=paying_user,
            transaction_type='deposit',
            amount=amount,
            status='pending',
            paystack_payment_reference=payment_reference,
        )

        data = {
            "authorization_url": payment_response['data']['authorization_url'],
            "reference": payment_reference,
            "transaction_id": str(transaction.id),
            "amount": amount,
            "wallet_id": str(wallet.id)
        }
        response = success_response(
            message_code="Payment initialized successfully",
            status_code=status.HTTP_200_OK,
            message=data
        )
        return response         
        
    
class VerifyDepositSerializer(serializers.Serializer):
    reference = serializers.CharField(max_length=100)