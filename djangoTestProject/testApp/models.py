from django.db import models


# Create your models here.

class Student(models.Model):
    student_id = models.CharField(max_length=10)
    name = models.CharField(max_length=40)
    surname = models.CharField(max_length=40)
    department = models.CharField(max_length=50, default="")
    email = models.EmailField(max_length=80)
    image = models.ImageField(upload_to='testApp/images/')
    url = models.URLField(blank=True)


class ApplyingStudent(Student):
    points = models.FloatField(help_text="Erasmus points of the student")


class University(models.Model):
    name = models.CharField(max_length=80)
    contactInfo = models.EmailField(max_length=80)
    rating = models.FloatField(help_text="Rating of the university",
                               verbose_name="should be out of 5")
    description = models.TextField(default='')
    department = models.CharField(max_length=50, default='')

    class Meta:
        verbose_name_plural = 'Universities'

    def __str__(self):
        return self.name


class FormerStudent(Student):
    university = models.ForeignKey(University, on_delete=models.CASCADE)

