# Generated by Django 4.0 on 2022-12-18 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dbint', '0020_alter_student_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='management',
            name='image',
            field=models.ImageField(blank=True, default='media/profile_pictures/default.png', upload_to='profile_pictures'),
        ),
        migrations.AlterField(
            model_name='thread',
            name='department',
            field=models.CharField(choices=[('CS', 'CS'), ('EE', 'EE'), ('ME', 'ME')], default='CS', max_length=10),
        ),
    ]
