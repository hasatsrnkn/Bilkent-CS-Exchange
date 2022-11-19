from django.db import models


#not finished
class ToDoList(models.Model):
    pass


#not finished
class Notification(models.Model):
    text = models.CharField(max_length=100, default='', blank=True)
    user = models.ForeignKey('MigrationApp.User', on_delete=models.CASCADE)


#not finished
class University(models.Model):
    name = models.CharField(max_length=100, default='')

    class Meta:
        verbose_name_plural = 'Universities'
    
