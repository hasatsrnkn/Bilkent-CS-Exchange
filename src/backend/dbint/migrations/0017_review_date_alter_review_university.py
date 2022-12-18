# Generated by Django 4.0 on 2022-12-17 20:45

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('dbint', '0016_alter_formerstudent_uni_visited'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, max_length=40),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='review',
            name='university',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='dbint.university'),
        ),
    ]