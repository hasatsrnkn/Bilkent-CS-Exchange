from django.db import models
from django.conf import settings

# if you change something, you should use makemigrations and migrate
# if you add a model, import it in __init__.py
# to see a model in admin interface, register it in admin.py

# delete options should be reviewed
# relations - nullable problem ?


class User(models.Model):
    name = models.CharField(max_length=100, default='')
    surname = models.CharField(max_length=100, default='')
    email = models.EmailField(max_length=100, default='')

    class Meta:
        verbose_name = "User"


class Student(User):
    bilkent_id = models.CharField(max_length=10, unique=True, default='')  #int or string????
    department = models.CharField(max_length=10, default='')
    image = models.ImageField(upload_to='profile_pictures', blank=True, default=None)


class ExchangeOffice(User):
    pass


class Management(User):
    check_list = models.ForeignKey('MigrationApp.ToDoList', blank=True,
                                   on_delete=models.CASCADE)
    image = models.ImageField(upload_to='profile_pictures', blank=True, default=None)


class ApplyingStudent(Student):
    check_list = models.OneToOneField('MigrationApp.ToDoList', blank=True, null=True,
                                      default=None,
                                      on_delete=models.CASCADE)


class FormerStudent(Student):
    uni_visited = models.ForeignKey('MigrationApp.University', on_delete=models.CASCADE)
    begin_date = models.DateField(max_length='20', default='')
    end_date = models.DateField(max_length='20', default='')


class DepartmentCoordinator(Management):
    department = models.CharField(max_length=10, default='')


class Instructor(Management):
    department = models.CharField(max_length=10, default='')


class ExchangeCoordinator(Management):
    pass


