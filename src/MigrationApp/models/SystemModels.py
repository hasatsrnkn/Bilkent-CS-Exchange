from django.db import models
from MigrationApp.models.ActorModels import User


#not finished
class ToDoList(models.Model):
    pass


#not finished
class Notification(models.Model):
    text = models.CharField(max_length=100, default='')
    user = models.ForeignKey(User, on_delete=models.CASCADE)


#not finished
class University(models.Model):
    name = models.CharField(max_length=100, default='')