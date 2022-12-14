from random import randint

from django.contrib.auth.models import UserManager, AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
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
    @classmethod
    def get_serializer(cls):
        class UserSerializer(serializers.ModelSerializer):
            class Meta:
                model = cls
                fields = '__all__'

        return UserSerializer  # return the class object so we can use this serializer

    def __str__(self):
        return '(' + self.id.__str__() + ')' +\
               ' User: ' + self.first_name + ' ' + self.last_name


class Student(User):
    department = models.CharField(max_length=10, choices=DEPARTMENT_CHOICES, default=1)
    image = models.ImageField(upload_to='profile_pictures', blank=True, default=None)
    points = models.FloatField(verbose_name="Erasmus grade points out of 100", default=0)


    @classmethod
    def get_serializer(cls):
        super_serializer = User.get_serializer()  # this important to not to break the serializing hierarchy

        class StudentSerializer(super_serializer):
            class Meta:
                model = cls  # this is the main trick here, this is how I tell the serializer about the model class
                fields = '__all__'

        return StudentSerializer

    class Meta:
        verbose_name = 'Student'
        verbose_name_plural = 'Students'

    def __str__(self):
        return '(' + self.id.__str__() + ')' +\
               ' Student: ' + self.first_name + ' ' + self.last_name


class ExchangeOffice(User):

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user_type = EXCO

        super(ExchangeOffice, self).save(*args, **kwargs)


class Management(User):
    check_list = models.ForeignKey('dbint.ToDoList', blank=True, null=True,
                                   on_delete=models.CASCADE)
    image = models.ImageField(upload_to='profile_pictures', blank=True, default=None)

    def __str__(self):
        return '(' + self.id.__str__() + ')' +\
               ' Management: ' + self.first_name + ' ' + self.last_name


class ApplyingStudent(Student):
    check_list = models.OneToOneField('dbint.ToDoList', blank=True, null=True,
                                      default=None,
                                      on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user_type = ASTU

        super(ApplyingStudent, self).save(*args, **kwargs)

    class Meta:
        verbose_name = 'Applying Student'
        verbose_name_plural = 'Applying Students'


class FormerStudent(Student):
    uni_visited = models.ForeignKey('dbint.UniversityDepartment', related_name='former_students', on_delete=models.CASCADE)
    begin_date = models.DateField(max_length='20', default='')
    end_date = models.DateField(max_length='20', default='')

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user_type = FSTU

        super(FormerStudent, self).save(*args, **kwargs)

    class Meta:
        verbose_name = 'Former Student'
        verbose_name_plural = 'Former Students'


class DepartmentCoordinator(Management):
    department = models.CharField(max_length=10, default='')

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user_type = DEPC

        super(DepartmentCoordinator, self).save(*args, **kwargs)

    def __str__(self):
        return '(' + self.id.__str__() + ')' +\
               ' ' + self.department + ' Department Coordinator: ' + \
               self.first_name + ' ' + self.last_name

    class Meta:
        verbose_name = 'Department Coordinator'
        verbose_name_plural = 'Department Coordinators'


class Instructor(Management):
    department = models.CharField(max_length=10, default='')
    courses = models.ManyToManyField('dbint.Course', related_name='courses',
                                     blank=True)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user_type = INST

        super(Instructor, self).save(*args, **kwargs)

    def __str__(self):
        return '(' + self.id.__str__() + ')' +\
               ' ' + self.department + ' Instructor: ' + self.first_name + ' ' + self.last_name

    class Meta:
        verbose_name = 'Instructor'
        verbose_name_plural = 'Instructors'


class ExchangeCoordinator(Management):

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user_type = EXCC

        super(ExchangeCoordinator, self).save(*args, **kwargs)

    def __str__(self):
        return '(' + self.id.__str__() + ')' +\
               ' Exchange Coordinator: ' + self.first_name + ' ' + self.last_name

    class Meta:
        verbose_name = 'Exchange Coordinator'
        verbose_name_plural = 'Exchange Coordinators'


