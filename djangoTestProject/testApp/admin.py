from django.contrib import admin
from .models import Student
from .models import ApplyingStudent
from .models import FormerStudent
from .models import University
# Register your models here.

admin.site.register(Student)
admin.site.register(ApplyingStudent)
admin.site.register(FormerStudent)
admin.site.register(University)



