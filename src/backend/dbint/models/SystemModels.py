from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save

from dbint.constants import DEPARTMENT_CHOICES
from dbint.signals import update_thread_reply_count
from dbint import constants


# if you change something, you should use makemigrations and migrate
# if you add a model, import it in __init__.py
# to see a model in admin interface, register it in admin.py

# delete options should be reviewed
# relations - nullable problem ?
# more departments should be added


class Chat(models.Model):
    sender = models.ForeignKey('dbint.User', on_delete=models.CASCADE,
                               related_name='sender', default=None)
    receiver = models.ForeignKey('dbint.User', on_delete=models.CASCADE,
                                 related_name='receiver', default=None)
    # TODO: Use user1 and user2 because sender and receiver is not constant on chat (Just change names).


class Message(models.Model):
    text = models.CharField(max_length=500, default='')
    send_date = models.DateTimeField(max_length=40, auto_now_add=True)
    chat = models.ForeignKey('dbint.Chat', on_delete=models.CASCADE)
    # TODO: add sender and receiver because it is important to show who is who on chat.
    # TODO: Is 500 length okay for message context? If so, leave it.


class Notification(models.Model):
    text = models.CharField(max_length=100, default='', blank=True)
    user = models.ForeignKey('dbint.User', on_delete=models.CASCADE)
    receive_date = models.DateTimeField(max_length=40, auto_now_add=True)
    seen = models.BooleanField(default=False)
    banner = models.ImageField(verbose_name='a small image about the notification', blank=True,
                               default=None, upload_to='noti_banners')
    # TODO: Is 100 length okay for notification context? If so, leave it.
    # TODO: If user is blank or user id = 0, the notification can be sended to all students or all users. (Something like that)
    # TODO: Maybe specify the notification (Message notification or todo list notification etc.) (area = models.IntegerField())
    #       For example the area of the notification is 0, it means the notification is a message notification.
    #       For example the area of the notification is 6, it means the notification is a todolist notification...


class Announcement(models.Model):
    date = models.DateTimeField(max_length=40, auto_now_add=True)
    context = models.CharField(max_length=30, default='', blank=True)
    text = models.TextField(max_length=1000, default='')
    announcer = models.ForeignKey('dbint.Management', on_delete=models.CASCADE)

    def __str__(self):
        return self.id.__str__() + " - " + self.context

    class Meta:
        ordering = ['date']


class Thread(models.Model):
    header = models.CharField(max_length=50, default='')
    question = models.TextField(max_length=1500, default='')
    department = models.CharField(max_length=10, choices=DEPARTMENT_CHOICES, default=1, )
    user = models.ForeignKey('dbint.User', on_delete=models.CASCADE)
    reply_count = models.IntegerField(default=0, blank=True)
    solved = models.BooleanField(default=False)
    context = models.CharField(max_length=30, default='', blank=True)
    start_date = models.DateTimeField(max_length=40, auto_now_add=True)
    view_count = models.IntegerField(default=0)

    def __str__(self):
        return self.id.__str__() + " - Thread: " + self.header

    class Meta:
        ordering = ['start_date']


post_save.connect(update_thread_reply_count, sender='dbint.Reply')


class Reply(models.Model):
    thread = models.ForeignKey('dbint.Thread', related_name='replies', on_delete=models.CASCADE, default='')
    user = models.ForeignKey('dbint.User', on_delete=models.CASCADE)
    text = models.TextField(max_length=500, default='')
    date = models.DateTimeField(max_length=40, auto_now_add=True)

    # TODO: Is 500 length okay for text? If so, leave it.

    def __str__(self):
        return self.id.__str__() + " - Reply: " + self.text[:10] + "..."

    class Meta:
        ordering = ['date']
        verbose_name_plural = 'Replies'


# not finished
class ToDoList(models.Model):
    class Meta:
        verbose_name = 'TODO List'


# not finished
class University(models.Model):
    name = models.CharField(max_length=100, default='')
    description = models.TextField(max_length=500, default='', blank=True)
    location = models.CharField(max_length=100, default='city, country')
    website_link = models.CharField(max_length=100, default='')
    contact = models.EmailField(max_length=100, default='')
    rating = models.FloatField(default=0.0)
    reviewCount = models.IntegerField(default=0)

    # TODO: Check deadline line. This line cannot be added automatically.

    class Meta:
        verbose_name_plural = 'Universities'
        ordering = ['rating']

    def __str__(self):
        return self.id.__str__() + " - " + self.name


# Department Specialized University ( NEW ) not finished
class UniversityDepartment(models.Model):
    university = models.ForeignKey('dbint.University', blank=False, null=False,
                                   default=None, related_name='university',
                                   on_delete=models.CASCADE)
    department = models.CharField(max_length=10, choices=DEPARTMENT_CHOICES, default='CS', )
    taught_in_english_info = models.CharField(max_length=150, blank=True, default='')
    quota = models.IntegerField(default=0)
    language_requirements = models.CharField(max_length=40, blank=True, default='')
    coordinator = models.ForeignKey('dbint.DepartmentCoordinator',
    # ADDED FOR PLACEMENT ALGORITHM
    quotaPlacement = models.IntegerField(default=0)
    # TODO: Departmant choices değil period choices olcak (fall - spring gibi)
    availablePeriod = models.CharField(max_length=10, choices=DEPARTMENT_CHOICES, default=1, )
    # ADDED FOR PLACEMENT ALGORITHM
                                    related_name='coordinator', on_delete=models.CASCADE, blank=False, default=None)
    threshold = models.IntegerField(default=0)

    # class Meta:
    # ordering = ['university.rating']

    # TODO: MUST REMOVE !!!!!!!!! I CANNOT REACH API SO I USE IT. DEFINITELY BE DELETED
    objects = models.Manager()
    # TODO: MUST REMOVE !!!!!!!!! I CANNOT REACH API SO I USE IT. DEFINITELY BE DELETED
    def __str__(self):
        return self.id.__str__() + " - " + self.university.name + " : " + self.get_department_display()


# University review ( NEW )
class Review(models.Model):
    university = models.ForeignKey('dbint.University', on_delete=models.CASCADE, blank=False)
    reviewer = models.ForeignKey('dbint.User', on_delete=models.CASCADE)
    text = models.TextField(max_length=500, default='')
    rating = models.FloatField(default=0)

class Document(models.Model):
    documentName = models.CharField(max_length=100, default='')
    type = models.CharField(max_length=10, default='pdf')
    documentOwner = models.OneToOneField('MigrationApp.User', blank=False, null=False,
                                      default=None,
                                      on_delete=models.CASCADE)
    date = models.DateTimeField(max_length=40, default=timezone.now)

class PreApprovalFormContent(Document):
    Name = models.CharField(max_length=100, default='')
    Surname = models.CharField(max_length=100, default='')
    IDNumber = models.IntegerField(max_length=15, default=0, blank=False)
    Department = models.CharField(max_length=100, default='')
    hostInst = models.CharField(max_length=100, default='')
    academicYear = models.CharField(max_length=100, default='')
    semester = models.CharField(max_length=100, default='')
    #courses = models.ManyToManyField('MigrationApp.Course', related_name='courses', blank=True)
    coordinatorName = models.CharField(max_length=100, default='')

# not finished
class Course(models.Model):
    name = models.CharField(max_length=100, default='')
    code = models.CharField(max_length=10, default='', blank=True)
    credits = models.FloatField(default=0)
