# Generated by Django 4.0 on 2022-12-08 13:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('MigrationApp', '0012_rename_viewcount_thread_view_count_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reply',
            name='thread',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='MigrationApp.thread'),
        ),
    ]