# Generated by Django 4.1.3 on 2022-12-13 00:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ExcelStudents',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstName', models.CharField(default='', max_length=100)),
                ('Lastname', models.CharField(default='', max_length=100)),
                ('studentID', models.CharField(default='', max_length=10, unique=True)),
                ('faculty', models.CharField(default='', max_length=100)),
                ('department', models.CharField(default='', max_length=100)),
                ('transcriptPoints', models.CharField(default=0.0, max_length=10)),
                ('totalPoints', models.CharField(default=0.0, max_length=10)),
                ('duration', models.CharField(default='', max_length=100)),
                ('firstPrefUni', models.CharField(default='', max_length=100)),
                ('secondPrefUni', models.CharField(default='', max_length=100)),
                ('thirdPrefUni', models.CharField(default='', max_length=100)),
                ('fourthPrefUni', models.CharField(default='', max_length=100)),
                ('fifthPrefUni', models.CharField(default='', max_length=100)),
            ],
        ),
    ]