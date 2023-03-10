# Generated by Django 4.0 on 2022-12-14 17:38

import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('username', models.CharField(default=75707144, error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=10, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='Bilkent ID')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('receiver', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='receiver', to='dbint.user')),
                ('sender', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='sender', to='dbint.user')),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=100)),
                ('code', models.CharField(blank=True, default='', max_length=10)),
                ('credits', models.FloatField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='ToDoList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'verbose_name': 'TODO List',
            },
        ),
        migrations.CreateModel(
            name='University',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=100)),
                ('description', models.TextField(blank=True, default='', max_length=500)),
                ('location', models.CharField(default='city, country', max_length=100)),
                ('website_link', models.CharField(default='', max_length=100)),
                ('contact', models.EmailField(default='', max_length=100)),
                ('rating', models.FloatField(default=0.0)),
                ('reviewCount', models.IntegerField(default=0)),
            ],
            options={
                'verbose_name_plural': 'Universities',
                'ordering': ['rating'],
            },
        ),
        migrations.CreateModel(
            name='ExchangeOffice',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dbint.user')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('dbint.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Management',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dbint.user')),
                ('image', models.ImageField(blank=True, default=None, upload_to='profile_pictures')),
                ('check_list', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='dbint.todolist')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('dbint.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dbint.user')),
                ('department', models.CharField(default='', max_length=10)),
                ('image', models.ImageField(blank=True, default=None, upload_to='profile_pictures')),
                ('points', models.FloatField(default=0, verbose_name='Erasmus grade points out of 100')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('dbint.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Thread',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('header', models.CharField(default='', max_length=50)),
                ('question', models.TextField(default='', max_length=1500)),
                ('department', models.CharField(choices=[('CS', 'CS'), ('EE', 'EE'), ('ME', 'ME')], default=1, max_length=10)),
                ('reply_count', models.IntegerField(blank=True, default=0)),
                ('solved', models.BooleanField(default=False)),
                ('context', models.CharField(blank=True, default='', max_length=30)),
                ('start_date', models.DateTimeField(auto_now_add=True, max_length=40)),
                ('view_count', models.IntegerField(default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dbint.user')),
            ],
            options={
                'ordering': ['start_date'],
            },
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(default='', max_length=500)),
                ('rating', models.FloatField(default=0)),
                ('reviewer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dbint.user')),
                ('university', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dbint.university')),
            ],
        ),
        migrations.CreateModel(
            name='Reply',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(default='', max_length=500)),
                ('date', models.DateTimeField(auto_now_add=True, max_length=40)),
                ('thread', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='dbint.thread')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dbint.user')),
            ],
            options={
                'verbose_name_plural': 'Replies',
                'ordering': ['date'],
            },
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(blank=True, default='', max_length=100)),
                ('receive_date', models.DateTimeField(auto_now_add=True, max_length=40)),
                ('seen', models.BooleanField(default=False)),
                ('banner', models.ImageField(blank=True, default=None, upload_to='noti_banners', verbose_name='a small image about the notification')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dbint.user')),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(default='', max_length=500)),
                ('send_date', models.DateTimeField(auto_now_add=True, max_length=40)),
                ('chat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dbint.chat')),
            ],
        ),
        migrations.CreateModel(
            name='DepartmentCoordinator',
            fields=[
                ('management_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dbint.management')),
                ('department', models.CharField(default='', max_length=10)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('dbint.management',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='ExchangeCoordinator',
            fields=[
                ('management_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dbint.management')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('dbint.management',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Announcement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True, max_length=40)),
                ('context', models.CharField(blank=True, default='', max_length=30)),
                ('text', models.TextField(default='', max_length=1000)),
                ('announcer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dbint.management')),
            ],
            options={
                'ordering': ['date'],
            },
        ),
        migrations.CreateModel(
            name='UniversityDepartment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('department', models.CharField(choices=[('CS', 'CS'), ('EE', 'EE'), ('ME', 'ME')], default='CS', max_length=10)),
                ('taught_in_english_info', models.CharField(blank=True, default='', max_length=150)),
                ('quota', models.IntegerField(default=0)),
                ('language_requirements', models.CharField(blank=True, default='', max_length=40)),
                ('threshold', models.IntegerField(default=0)),
                ('university', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='university', to='dbint.university')),
                ('coordinator', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='coordinator', to='dbint.departmentcoordinator')),
            ],
        ),
        migrations.CreateModel(
            name='Instructor',
            fields=[
                ('management_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dbint.management')),
                ('department', models.CharField(default='', max_length=10)),
                ('courses', models.ManyToManyField(blank=True, related_name='courses', to='dbint.Course')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('dbint.management',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='FormerStudent',
            fields=[
                ('student_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dbint.student')),
                ('begin_date', models.DateField(default='', max_length='20')),
                ('end_date', models.DateField(default='', max_length='20')),
                ('uni_visited', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='former_students', to='dbint.universitydepartment')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('dbint.student',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='ApplyingStudent',
            fields=[
                ('student_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dbint.student')),
                ('check_list', models.OneToOneField(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='dbint.todolist')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('dbint.student',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
