from django.db import models
from django.conf import settings

# Create your models here.
class ExcelStudents(models.Model):
    firstName = models.CharField(max_length=100, default='')
    lastname = models.CharField(max_length=100, default='')
    studentID = models.CharField(max_length=10, default='')  #int or string????
    faculty = models.CharField(max_length=100, default='')
    department = models.CharField(max_length=100, default='')
    transcriptPoints = models.CharField(max_length=10, default=0.0)
    totalPoints = models.CharField(max_length=10, default=0.0)
    duration = models.CharField(max_length=100, default='')
    firstPrefUni = models.CharField(max_length=100, default='')
    secondPrefUni = models.CharField(max_length=100, default='')
    thirdPrefUni = models.CharField(max_length=100, default='')
    fourthPrefUni = models.CharField(max_length=100, default='')
    fifthPrefUni = models.CharField(max_length=100, default='')
    placedUni = models.ForeignKey('MigrationApp.University', null=True,
                                      default=None,
                                      on_delete=models.CASCADE)

    class Meta:
        ordering = ['-totalPoints', '-transcriptPoints']
    def __str__(self):
        return self.firstName

    objects = models.Manager()