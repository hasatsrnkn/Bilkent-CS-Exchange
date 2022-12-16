
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import *
# Register your models here.


class ASTUAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Student Fields', {'fields': ('department', 'image', 'points')}),
        ('ASTU Fields', {'fields': ('check_list', 'applied_university', 'stu_depc', 'stu_excc')}),
    )


class FSTUAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Student Fields', {'fields': ('department', 'image', 'points')}),
        ('FSTU Fields', {'fields': ('uni_visited', 'begin_date', 'end_date')}),
    )


class DEPCAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Management Fields', {'fields': ('image', 'check_list')}),
        ('DEPC Fields', {'fields': ('department',)}),
    )


class INSTAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Management Fields', {'fields': ('image', 'check_list')}),
        ('DEPC Fields', {'fields': ('department', 'courses')}),
    )


admin.site.register(User, UserAdmin)

admin.site.register(ApplyingStudent, ASTUAdmin)
admin.site.register(FormerStudent, FSTUAdmin)
admin.site.register(DepartmentCoordinator, DEPCAdmin)
admin.site.register(Instructor, INSTAdmin)
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