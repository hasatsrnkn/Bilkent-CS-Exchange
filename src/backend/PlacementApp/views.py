from django.shortcuts import render
from FileAnalyzeApp.models import ExcelStudents
from dbint.models.SystemModels import UniversityDepartment
from dbint.models.ActorModels import ApplyingStudent, ExchangeCoordinator
from dbint.models.SystemModels import University
from dbint.constants import *

# Create your views here.
def GetStudents(request):
    students = ExcelStudents.objects.all()
    universities = University.objects.all()

    for stu in students:
        for i in range (0,5):
            if i == 0 :
                universityName = stu.firstPrefUni
            elif i == 1:
                universityName = stu.secondPrefUni
            elif i == 2:
                universityName = stu.thirdPrefUni
            elif i == 3:
                universityName = stu.fourthPrefUni
            else:
                universityName = stu.fifthPrefUni
            for tempUniversity in universities:
                if(universityName == tempUniversity.name):
                    #universityDepartments = tempUniversity.university_departments.all()
                    departments = UniversityDepartment.objects.all()
                    for currentDepartment in departments:

                        if currentDepartment.university.name == universityName and TURKISH_DEPARTMENT.get(stu.department) == currentDepartment.department and currentDepartment.quotaPlacement > 0:
                            stu.placedUni = tempUniversity
                            stu.save(update_fields=["placedUni"])
                            tempQuota = currentDepartment.quotaPlacement
                            tempQuota = tempQuota - 1
                            currentDepartment.quotaPlacement = tempQuota
                            currentDepartment.save(update_fields=["quotaPlacement"])
                            createdApplyingStudents = ApplyingStudent.objects.create(
                                                            first_name=stu.firstName, last_name=stu.lastname,
                                                            username=stu.lastname, password='12345',
                                                            department=TURKISH_DEPARTMENT.get(stu.department), points=stu.totalPoints,
                                                            applied_university = tempUniversity)
                            createdApplyingStudents.stu_depc = currentDepartment.coordinator
                            createdApplyingStudents.stu_excc = ExchangeCoordinator.objects.get(username='yelda')
                            createdApplyingStudents.save()
                            break
                        elif TURKISH_DEPARTMENT.get(stu.department) == currentDepartment.department and currentDepartment.quotaPlacement == 0:
                            break
                        else:
                            pass
    return render(request, 'placementExample.html', {})

