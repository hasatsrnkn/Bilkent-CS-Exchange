from django.db import models
from MigrationApp.models.SystemModels import ToDoList
from MigrationApp.models.SystemModels import University

class User(models.Model):
    name = models.CharField(max_length=100, default='')
    surname = models.CharField(max_length=100, default='')
    email = models.EmailField(max_length=100, default='')


class Student(User):
    bilkent_id = models.CharField(max_length=10, unique=True, default='')  #int or string????
    department = models.CharField(max_length=10, default='')


class ExchangeOffice(User):
    pass


class Management(User):
    check_list = models.ForeignKey(ToDoList, on_delete=models.CASCADE)


class ApplyingStudent(Student):
    check_list = models.ForeignKey(ToDoList, on_delete=models.CASCADE)


class FormerStudent(Student):
    checkList = models.ForeignKey(ToDoList, on_delete=models.CASCADE)
    uni_visited = models.ForeignKey(University, on_delete=models.CASCADE)
    begin_date = models.DateField(max_length='20', default='')
    end_date = models.DateField(max_length='20', default='')

class DepartmentCoordinator(Management):
    department = models.CharField(max_length=10, default='')


class Instructor(Management):
    department = models.CharField(max_length=10, default='')


class ExchangeCoordinator(Management):
    pass


