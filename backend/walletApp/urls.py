from django.urls import path, include
from walletApp import views
from .views import (
    WalletDetailView,
    VerifyDepositView,
    PaystackWebhookView
)
from rest_framework.routers import DefaultRouter

app_name = 'walletApp'
router = DefaultRouter(trailing_slash=False)
router.register(r'transactions', views.TransactionHistoryView, basename='transaction')

urlpatterns = [
    path('', include(router.urls)),
    path('wallet/', WalletDetailView.as_view(), name='wallet-detail'),
    path('deposit/verify/', VerifyDepositView.as_view(), name='verify-deposit'),
    path('paystack/webhook/', PaystackWebhookView.as_view(), name='paystack-webhook'),

]