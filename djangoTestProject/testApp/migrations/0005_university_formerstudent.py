# Generated by Django 4.0 on 2022-11-09 19:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('testApp', '0004_applyingstudent'),
    ]

    operations = [
        migrations.CreateModel(
            name='University',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80)),
                ('contactInfo', models.EmailField(max_length=80)),
                ('rating', models.FloatField(help_text='Rating of the university', verbose_name='should be out of 5')),
            ],
        ),
        migrations.CreateModel(
            name='FormerStudent',
            fields=[
                ('student_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='testApp.student')),
                ('university', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='testApp.university')),
            ],
            bases=('testApp.student',),
        ),
    ]