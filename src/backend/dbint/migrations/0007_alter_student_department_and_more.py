# Generated by Django 4.0 on 2022-12-15 19:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dbint', '0006_rename_coordinator_applyingstudent_stu_depc_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='department',
            field=models.CharField(choices=[('CS', 'CS'), ('EE', 'EE'), ('ME', 'ME')], default='CS', max_length=10),
        ),
        migrations.AlterField(
            model_name='universitydepartment',
            name='university',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='university', to='dbint.university'),
        ),
    ]
