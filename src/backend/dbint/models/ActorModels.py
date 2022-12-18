from django.contrib.auth.models import UserManager, AbstractUser, Permission, Group
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db.models.signals import post_save
from django.utils.translation import gettext_lazy as _
from django.db import models
from django.conf import settings

# if you change something, you should use makemigrations and migrate
# if you add a model, import it in __init__.py
# to see a model in admin interface, register it in admin.py

# delete options should be reviewed
# relations - nullable problem ?
from rest_framework import serializers
from dbint.constants import *


class User(AbstractUser):
    user_type = models.CharField(max_length=30, choices=USER_TYPE_CHOICES, default='FormerStudent')
    '''username_validator = UnicodeUsernameValidator()

    username = models.CharField(max_length=10, verbose_name='Bilkent ID', help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator], unique=True, default=randint(1, 99999999), error_messages={
            "unique": _("A user with that username already exists."),
        },)  #int or string????
    '''

    def save(self, *args, **kwargs):

        super(AbstractUser, self).save(*args, **kwargs)

    def get_manager(self):
        if self.user_type == ASTU:
            return ApplyingStudent.objects
        elif self.user_type == FSTU:
            return FormerStudent.objects
        elif self.user_type == DEPC:
            return DepartmentCoordinator.objects
        elif self.user_type == INST:
            return Instructor.objects
        elif self.user_type == EXCC:
            return ExchangeCoordinator.objects
        elif self.user_type == EXCO:
            return ExchangeOffice.objects
        else:
            return User.objects

    def __str__(self):
        return '(' + self.id.__str__() + ')' + \
               ' User: ' + self.first_name + ' ' + self.last_name


class Student(User):
    department = models.CharField(max_length=10, choices=DEPARTMENT_CHOICES, default=CS)
    image = models.ImageField(upload_to='profile_pictures', blank=True, default='profile_pictures/default.png')
    points = models.FloatField(verbose_name="Erasmus grade points out of 100", default=0)

    class Meta:
        verbose_name = 'Student'
        verbose_name_plural = 'Students'

    def __str__(self):
        return '(' + self.id.__str__() + ')' + \
               ' Student: ' + self.first_name + ' ' + self.last_name


class ExchangeOffice(User):

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user_type = EXCO

        super(User, self).save(*args, **kwargs)

    class Meta:
        verbose_name = 'Exchange Office Account'
        verbose_name_plural = 'Exchange Office Accounts'


class Management(User):
    check_list = models.OneToOneField('dbint.ToDoList', blank=True, null=True, related_name='management_owner',
                                   on_delete=models.CASCADE)
    image = models.ImageField(upload_to='profile_pictures', blank=True, default='media/profile_pictures/default.png')

    def __str__(self):
        return '(' + self.id.__str__() + ')' + \
               ' Management: ' + self.first_name + ' ' + self.last_name


class ApplyingStudent(Student):
    check_list = models.OneToOneField('dbint.ToDoList', blank=True, null=True, default=None, related_name='astu_owner',
                                      on_delete=models.CASCADE)
    stu_depc = models.ForeignKey('dbint.DepartmentCoordinator', related_name='stu_depc', null=True, default=None,
                                 on_delete=models.CASCADE)
    stu_excc = models.ForeignKey('dbint.ExchangeCoordinator', related_name='stu_excc', null=True, default=None,
                                 on_delete=models.CASCADE)
    applied_university = models.ForeignKey('dbint.University', blank=False, null=True,
                                           default=None, related_name='applied_university',
                                           on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user_type = ASTU

        super(Student, self).save(*args, **kwargs)

    class Meta:
        verbose_name = 'Applying Student'
        verbose_name_plural = 'Applying Students'


class FormerStudent(Student):
    uni_visited = models.ForeignKey('dbint.University', related_name='former_students', null=True, blank=True,
                                    on_delete=models.CASCADE)
    begin_date = models.DateField(max_length='20', default=None, null=True)
    end_date = models.DateField(max_length='20', auto_now_add=True)
    entered_review = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user_type = FSTU

        super(Student, self).save(*args, **kwargs)

    class Meta:
        verbose_name = 'Former Student'
        verbose_name_plural = 'Former Students'


class DepartmentCoordinator(Management):
    department = models.CharField(max_length=10, choices=DEPARTMENT_CHOICES, default=CS)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user_type = DEPC

        super(Management, self).save(*args, **kwargs)

    def __str__(self):
        return '(' + self.id.__str__() + ')' + \
               ' ' + self.department + ' Department Coordinator: ' + \
               self.first_name + ' ' + self.last_name

    class Meta:
        verbose_name = 'Department Coordinator'
        verbose_name_plural = 'Department Coordinators'


class Instructor(Management):
    department = models.CharField(max_length=10, choices=DEPARTMENT_CHOICES, default=CS)
    courses = models.ManyToManyField('dbint.Course', related_name='instructor_of_course',
                                     blank=True)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user_type = INST

        super(Management, self).save(*args, **kwargs)

    def __str__(self):
        return '(' + self.id.__str__() + ')' + \
               ' ' + self.department + ' Instructor: ' + self.first_name + ' ' + self.last_name

    class Meta:
        verbose_name = 'Instructor'
        verbose_name_plural = 'Instructors'


class ExchangeCoordinator(Management):

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user_type = EXCC

        super(Management, self).save(*args, **kwargs)

    def __str__(self):
        return '(' + self.id.__str__() + ')' + \
               ' Exchange Coordinator: ' + self.first_name + ' ' + self.last_name

    class Meta:
        verbose_name = 'Exchange Coordinator'
        verbose_name_plural = 'Exchange Coordinators'
