# Generated by Django 4.0 on 2022-12-12 16:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('MigrationApp', '0018_alter_announcement_options_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='university',
            options={'ordering': ['rating'], 'verbose_name_plural': 'Universities'},
        ),
    ]
