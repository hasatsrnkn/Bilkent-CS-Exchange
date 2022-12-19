# Generated by Django 4.0 on 2022-12-19 00:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dbint', '0026_document_document_document_extension_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='document',
            name='documentOwner',
        ),
        migrations.RemoveField(
            model_name='document',
            name='document_name',
        ),
        migrations.AddField(
            model_name='document',
            name='documentName',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='document',
            name='document_owner',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='docs', to='dbint.user'),
        ),
    ]
