from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import *
# Register your models here.

admin.site.register(User)

admin.site.register(ApplyingStudent)
admin.site.register(FormerStudent)
admin.site.register(DepartmentCoordinator)
admin.site.register(Instructor)
admin.site.register(ExchangeCoordinator)
admin.site.register(ExchangeOffice)

admin.site.register(Notification)
admin.site.register(ToDoList)
admin.site.register(University)
admin.site.register(UniversityDepartment)
admin.site.register(Chat)
admin.site.register(Message)
admin.site.register(Announcement)
admin.site.register(Thread)
admin.site.register(Reply)

admin.site.register(Course)



