from django.db.models.signals import post_save
from django.db.models.signals import post_delete
from django.dispatch import receiver


@receiver(post_save, sender='MigrationApp.Reply')
@receiver(post_delete, sender='MigrationApp.Reply')
def update_thread_reply_count(sender, instance, created=False, **kwargs):
    if created:
        # Increment the reply_count field of the associated thread
        instance.thread.reply_count += 1
    else:
        # Increment the reply_count field of the associated thread
        instance.thread.reply_count -= 1

    instance.thread.save()

