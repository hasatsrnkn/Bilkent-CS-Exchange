from django.db import models
from django.conf import settings

# if you change something, you should use makemigrations and migrate
# if you add a model, import it in __init__.py
# to see a model in admin interface, register it in admin.py

# delete options should be reviewed
# relations - nullable problem ?
from rest_framework import serializers


class User(models.Model):
    name = models.CharField(max_length=100, default='')
    surname = models.CharField(max_length=100, default='')
    email = models.EmailField(max_length=100, default='')

    @classmethod
    def get_serializer(cls):
        class UserSerializer(serializers.ModelSerializer):
            class Meta:
                model = cls
                fields = '__all__'

        return UserSerializer  # return the class object so we can use this serializer

    def __str__(self):
        return '(' + self.id.__str__() + ')' +\
               ' User: ' + self.name + ' ' + self.surname


class Student(User):
    bilkent_id = models.CharField(max_length=10, unique=True, default='')  #int or string????
    department = models.CharField(max_length=10, default='')
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

    def __str__(self):
        return '(' + self.id.__str__() + ')' +\
               ' Student: ' + self.name + ' ' + self.surname


class ExchangeOffice(User):
    pass


class Management(User):
    check_list = models.ForeignKey('MigrationApp.ToDoList', blank=True, null = True,
                                   on_delete=models.CASCADE)
    image = models.ImageField(upload_to='profile_pictures', blank=True, default=None)

    def __str__(self):
        return '(' + self.id.__str__() + ')' +\
               ' Management: ' + self.name + ' ' + self.surname


class ApplyingStudent(Student):
    check_list = models.OneToOneField('MigrationApp.ToDoList', blank=True, null=True,
                                      default=None,
                                      on_delete=models.CASCADE)


class FormerStudent(Student):
    uni_visited = models.ForeignKey('MigrationApp.UniversityDepartment', related_name='former_students', on_delete=models.CASCADE)
    begin_date = models.DateField(max_length='20', default='')
    end_date = models.DateField(max_length='20', default='')


class DepartmentCoordinator(Management):
    department = models.CharField(max_length=10, default='')

    def __str__(self):
        return '(' + self.id.__str__() + ')' +\
               ' ' + self.department + ' Department Coordinator: ' + \
               self.name + ' ' + self.surname


class Instructor(Management):
    department = models.CharField(max_length=10, default='')
    courses = models.ManyToManyField('MigrationApp.Course', related_name='courses',
                                     blank=True)

    def __str__(self):
        return '(' + self.id.__str__() + ')' +\
               ' ' + self.department + ' Instructor: ' + self.name + ' ' + self.surname


class ExchangeCoordinator(Management):

    def __str__(self):
        return '(' + self.id.__str__() + ')' +\
               ' Exchange Coordinator: ' + self.name + ' ' + self.surname

