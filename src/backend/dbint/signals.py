from django.contrib.auth.models import Group
from django.db.models.signals import post_save
from django.db.models.signals import post_delete
from django.dispatch import receiver


@receiver(post_save, sender='dbint.User')
def add_user_to_default_group(sender, instance, created=False, **kwargs):
    if created:
        sender.groups.add(Group.objects.get(name='Users'))


@receiver(post_save, sender='dbint.Reply')
@receiver(post_delete, sender='dbint.Reply')
def update_thread_reply_count(sender, instance, created=False, **kwargs):
    if created:
        # Increment the reply_count field of the associated thread
        instance.thread.reply_count += 1
    else:
        # Decrement the reply_count field of the associated thread
        instance.thread.reply_count -= 1

    instance.thread.save()


@receiver(post_save, sender='dbint.Review')
@receiver(post_delete, sender='dbint.Review')
def update_uni_review_count(sender, instance, created=False, **kwargs):
    if created:
        instance.reviewer.entered_review = True

        instance.university.review_count += 1
        instance.university.calculate_rating()
    else:
        if not instance.reviewer.fstu_reviews.all():
            instance.reviewer.entered_review = False

        instance.university.review_count -= 1
        instance.university.calculate_rating()

    instance.university.save()



