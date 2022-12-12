# Generated by Django 4.0 on 2022-12-10 18:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MigrationApp', '0015_alter_reply_options_alter_thread_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='reply',
            options={'ordering': ['date'], 'verbose_name_plural': 'Replies'},
        ),
        migrations.AlterField(
            model_name='thread',
            name='department',
            field=models.CharField(choices=[(1, 'CS'), (2, 'EE'), (3, 'ME')], default=1, max_length=10),
        ),
    ]
