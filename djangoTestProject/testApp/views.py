from django.shortcuts import render
from .models import Student
# Create your views here.
from django.http import HttpResponse


def home(request):
    searchTerm = request.GET.get('searchTerm_studentName')
    students = Student.objects.all()
    for stu in students:
        if searchTerm == stu.surname:
            studentToView = stu
            break
        else:
            studentToView = None
    return render(request, 'home.html', {'searchTerm': searchTerm, 'stu': studentToView})


def signup(request):
    email = request.GET.get('email')
    return render(request, 'signup.html', {'email': email})


def about(request):
    return HttpResponse('<h1>Welcome to About Page</h1>')