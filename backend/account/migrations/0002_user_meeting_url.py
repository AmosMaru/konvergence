# Generated by Django 5.2 on 2025-05-13 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='meeting_url',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Meeting URL'),
        ),
    ]
