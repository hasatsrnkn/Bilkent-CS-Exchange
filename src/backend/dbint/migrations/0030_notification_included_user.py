# Generated by Django 4.0 on 2022-12-19 20:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dbint', '0029_alter_notification_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='included_user',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='in_notis', to='dbint.user'),
        ),
    ]
