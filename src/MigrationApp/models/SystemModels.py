from django.db import models

# if you change something, you should use makemigrations and migrate
# if you add a model, import it in __init__.py
# to see a model in admin interface, register it in admin.py

# delete options should be reviewed
# relations - nullable problem ?


class Chat(models.Model):
    sender = models.ForeignKey('MigrationApp.User', on_delete=models.CASCADE,
                               related_name='sender', default=None)
    receiver = models.ForeignKey('MigrationApp.User', on_delete=models.CASCADE,
                                 related_name='receiver', default=None)


class Message(models.Model):
    text = models.CharField(max_length=500, default='')
    send_date = models.DateTimeField(max_length=40, auto_now_add=True)
    chat = models.ForeignKey('MigrationApp.Chat', on_delete=models.CASCADE)


class Notification(models.Model):
    text = models.CharField(max_length=100, default='', blank=True)
    user = models.ForeignKey('MigrationApp.User', on_delete=models.CASCADE)
    receive_date = models.DateTimeField(max_length=40, auto_now_add=True)
    seen = models.BooleanField(default=False)
    banner = models.ImageField(verbose_name='a small image about the notification', blank=True,
                               default=None, upload_to='noti_banners')


class Announcement(models.Model):
    date = models.DateTimeField(max_length=40, auto_now_add=True)
    context = models.CharField(max_length=30, default='', blank=True)
    announcer = models.ForeignKey('MigrationApp.Management', on_delete=models.CASCADE)


class Forum(models.Model):
    department = models.CharField(max_length=10, default='')


class Thread(models.Model):
    forum = models.ForeignKey('MigrationApp.Forum', on_delete=models.CASCADE)
    user = models.ForeignKey('MigrationApp.User', on_delete=models.CASCADE)
    reply_count = models.IntegerField(default=0, blank=True)
    solved = models.BooleanField(default=False)
    context = models.CharField(max_length=30, default='', blank=True)
    start_date = models.DateTimeField(max_length=40, auto_now_add=True)


# not finished
class ToDoList(models.Model):
    class Meta:
        verbose_name = 'TODO List'


# not finished
class University(models.Model):
    name = models.CharField(max_length=100, default='')

    class Meta:
        verbose_name_plural = 'Universities'
