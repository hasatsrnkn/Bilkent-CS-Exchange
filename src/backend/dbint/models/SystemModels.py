from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone

from dbint.constants import DEPARTMENT_CHOICES, CS
from dbint.constants import PERIOD_CHOICES
from dbint import constants


# if you change something, you should use makemigrations and migrate
# if you add a model, import it in __init__.py
# to see a model in admin interface, register it in admin.py

# delete options should be reviewed
# relations - nullable problem ?
# more departments should be added


class Chat(models.Model):
    user1 = models.ForeignKey('dbint.User', on_delete=models.CASCADE,
                               related_name='user1', default=None)
    user2 = models.ForeignKey('dbint.User', on_delete=models.CASCADE,
                                 related_name='user2', default=None)


class Message(models.Model):
    sender = models.ForeignKey('dbint.User', on_delete=models.CASCADE,
                               related_name='sender', default=None)
    receiver = models.ForeignKey('dbint.User', on_delete=models.CASCADE,
                               related_name='receiver', default=None)
    text = models.CharField(max_length=500, default='')
    send_date = models.DateTimeField(max_length=40, auto_now_add=True)
    chat = models.ForeignKey('dbint.Chat', on_delete=models.CASCADE)


class Notification(models.Model):
    text = models.CharField(max_length=200, default='', blank=True)
    user = models.ForeignKey('dbint.User', on_delete=models.CASCADE, default=None)
    receive_date = models.DateTimeField(max_length=40, auto_now_add=True)
    seen = models.BooleanField(default=False)
    banner = models.ImageField(verbose_name='a small image about the notification', blank=True,
                               default=None, upload_to='noti_banners')
    type = models.CharField(max_length=100, default='', blank=True)

    class Meta:
        ordering = ['receive_date']


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
    department = models.CharField(max_length=10, choices=DEPARTMENT_CHOICES, default=CS)
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


class ListItem(models.Model):
    list = models.ForeignKey('dbint.ToDoList', blank=True, null=False,
                             related_name='items',
                             on_delete=models.CASCADE)
    text = models.CharField(max_length=100, default='', blank=True)
    completed = models.BooleanField(default=False)
    deadline = models.DateTimeField(verbose_name="The task should be completed before this date")

    def __str__(self):
        return self.id.__str__() + " - Task: " + self.text[:10] + "..."


# not finished
class University(models.Model):
    name = models.CharField(max_length=100, default='')
    description = models.TextField(max_length=500, default='', blank=True)
    location = models.CharField(max_length=100, default='city, country')
    website_link = models.CharField(max_length=100, default='')
    contact = models.EmailField(max_length=100, default='')
    rating = models.FloatField(default=0.0)
    review_count = models.IntegerField(default=0)

    # TODO: Check deadline line. This line cannot be added automatically.

    def __str__(self):
        return self.id.__str__() + " - " + self.name

    def calculate_rating(self):
        sum = 0.0
        if self.review_count <= 0:
            self.rating = 0
        else:
            reviews_of_uni = self.reviews.order_by('date')
            for rev in reviews_of_uni:
                if rev.rating <= 5 and rev.rating >= 0 and (not rev.reviewer.entered_review):
                    rev.reviewer.entered_review = True
                    rev.reviewer.save()
                    sum += rev.rating
            self.rating = sum / self.review_count

    class Meta:
        verbose_name_plural = 'Universities'
        ordering = ['rating']


# Department Specialized University ( NEW ) not finished
class UniversityDepartment(models.Model):
    university = models.ForeignKey('dbint.University', blank=False, null=False,
                                   default=None, related_name='university',
                                   on_delete=models.CASCADE)
    department = models.CharField(max_length=10, choices=DEPARTMENT_CHOICES, default='CS', )
    taught_in_english_info = models.CharField(max_length=150, blank=True, default='')
    quota = models.IntegerField(default=0)
    language_requirements = models.CharField(max_length=40, blank=True, default='')
    coordinator = models.ForeignKey('dbint.DepartmentCoordinator', related_name='assigned_unis',
                                    on_delete=models.CASCADE, blank=False, default=None)
    # ADDED FOR PLACEMENT ALGORITHM
    quotaPlacement = models.IntegerField(default=0)
    # TODO: Departmant choices değil period choices olcak (fall - spring gibi)
    availablePeriod = models.CharField(max_length=10, choices=PERIOD_CHOICES, default='FALL', )
    # ADDED FOR PLACEMENT ALGORITHM

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
    university = models.ForeignKey('dbint.University', on_delete=models.CASCADE, blank=False, related_name='reviews')
    reviewer = models.ForeignKey('dbint.FormerStudent', related_name='fstu_reviews', on_delete=models.CASCADE)
    text = models.TextField(max_length=500, default='')
    rating = models.FloatField(default=0)
    date = models.DateTimeField(max_length=40, auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.university == self.reviewer.uni_visited:
            super(Review, self).save(*args, **kwargs)
        else:
            raise ValidationError('Former students can only review their universities')

    def __str__(self):
        return self.id.__str__() + " - Review to: " + self.university.name


class Document(models.Model):
    document = models.FileField(upload_to='files', default=None)
    documentName = models.CharField(max_length=100, default='')
    extension = models.CharField(max_length=10, default='xlsx')
    type = models.CharField(max_length=100, default='Excel File')
    documentOwner = models.OneToOneField('dbint.User', blank=False, null=False,
                                         default=None,
                                         on_delete=models.CASCADE)
    date = models.DateTimeField(max_length=40, default=timezone.now)

    class Meta:
        verbose_name_plural = 'Documents'


class PreApprovalFormContent(Document):
    Name = models.CharField(max_length=100, default='')
    Surname = models.CharField(max_length=100, default='')
    IDNumber = models.IntegerField(default=0, blank=False)
    Department = models.CharField(max_length=100, default='')
    hostInst = models.CharField(max_length=100, default='')
    academicYear = models.CharField(max_length=100, default='')
    semester = models.CharField(max_length=100, default='')
    # courses = models.ManyToManyField('dbint.Course', related_name='courses', blank=True)
    coordinatorName = models.CharField(max_length=100, default='')


# not finished
class Course(models.Model):
    name = models.CharField(max_length=100, default='')
    department = models.CharField(max_length=10, choices=DEPARTMENT_CHOICES, default='CS', )
    code = models.CharField(max_length=10, default='', blank=True)
    credits = models.FloatField(default=0)
    syllabus_link = models.URLField(max_length=300, default='')


class ForeignCourse(models.Model):
    #Course'a child class olarak atayınca hata veriyor.
    name = models.CharField(max_length=100, default='')
    department = models.CharField(max_length=10, choices=DEPARTMENT_CHOICES, default='CS', )
    code = models.CharField(max_length=10, default='', blank=True)
    credits = models.FloatField(default=0)
    syllabus_link = models.CharField(max_length=300, default='')
    university = models.ForeignKey('dbint.University', blank=False, null=False,
                                   default=None, related_name='foreign_course_university',
                                   on_delete=models.CASCADE)


class CourseRelation(models.Model):
    #TODO: bilkent_course objesinden departmanlar ve instructorlar çekilir ve ona göre ilgili
    # departman koordinatörüne ve instructora gösterilir.
    bilkent_course = models.ForeignKey('dbint.Course', related_name='bilkent_course', default=None,
                                    on_delete=models.CASCADE)
    foreign_course = models.ForeignKey('dbint.ForeignCourse', related_name='foreign_course', default=None,
                                    on_delete=models.CASCADE)
    approved_status = models.BooleanField(default=False)