# Generated by Django 4.0 on 2022-12-08 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MigrationApp', '0011_announcement_text_thread_viewcount_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='thread',
            old_name='viewCount',
            new_name='view_count',
        ),
        migrations.RemoveField(
            model_name='thread',
            name='forum',
        ),
        migrations.AddField(
            model_name='thread',
            name='department',
            field=models.CharField(default='', max_length=10),
        ),
        migrations.DeleteModel(
            name='Forum',
        ),
    ]