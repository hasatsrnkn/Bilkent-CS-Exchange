# Generated by Django 4.0 on 2022-12-17 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dbint', '0014_alter_formerstudent_begin_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formerstudent',
            name='begin_date',
            field=models.DateField(default=None, max_length='20', null=True),
        ),
    ]
