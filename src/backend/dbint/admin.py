from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Permission
from dbint.signals import *

from .models import *
from dbint.models.SystemModels import Document
from dbint.models.SystemModels import ListItem


# Register your models here.


class ASTUAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Student Fields', {'fields': ('department', 'image', 'points')}),
        ('ASTU Fields', {'fields': ('check_list', 'applied_university', 'stu_depc', 'stu_excc')}),
    )


class FSTUAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Student Fields', {'fields': ('department', 'image', 'points')}),
        ('FSTU Fields', {'fields': ('uni_visited', 'begin_date', 'entered_review')}),
    )


class DEPCAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Management Fields', {'fields': ('image', 'check_list')}),
        ('DEPC Fields', {'fields': ('department',)}),
    )


class INSTAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Management Fields', {'fields': ('image', 'check_list')}),
        ('INST Fields', {'fields': ('department', 'courses')}),
    )


class EXCCAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Management Fields', {'fields': ('image', 'check_list')}),
    )


admin.site.register(User, UserAdmin)

admin.site.register(ApplyingStudent, ASTUAdmin)
admin.site.register(FormerStudent, FSTUAdmin)
admin.site.register(DepartmentCoordinator, DEPCAdmin)
admin.site.register(Instructor, INSTAdmin)
admin.site.register(ExchangeCoordinator, EXCCAdmin)
admin.site.register(ExchangeOffice, UserAdmin)

admin.site.register(Document)
admin.site.register(Notification)
admin.site.register(ToDoList)
admin.site.register(ListItem)
admin.site.register(University)
admin.site.register(UniversityDepartment)
admin.site.register(Review)
admin.site.register(Chat)
admin.site.register(Message)
admin.site.register(Announcement)
admin.site.register(Thread)
admin.site.register(Reply)

admin.site.register(Course)
admin.site.register(Permission)

post_save.connect(add_user_to_default_group, sender='dbint.User')
post_save.connect(update_thread_reply_count, sender='dbint.Reply')
#post_save.connect(update_uni_review_count, sender='dbint.Review')
post_save.connect(create_notf_for_announcement, sender='dbint.Announcement')
post_save.connect(create_notf_for_message, sender='dbint.Message')
post_save.connect(create_notf_for_document, sender='dbint.Document')
