# Generated by Django 4.0 on 2022-12-12 16:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('MigrationApp', '0019_alter_university_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='universitydepartment',
            name='coordinator',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='coordinator', to='MigrationApp.departmentcoordinator'),
        ),
    ]
