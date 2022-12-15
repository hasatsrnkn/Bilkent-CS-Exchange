
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import *
# Register your models here.

admin.site.register(User, UserAdmin)

admin.site.register(ApplyingStudent)
admin.site.register(FormerStudent, UserAdmin)
admin.site.register(DepartmentCoordinator, UserAdmin)
admin.site.register(Instructor, UserAdmin)
admin.site.register(ExchangeCoordinator, UserAdmin)
admin.site.register(ExchangeOffice, UserAdmin)

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