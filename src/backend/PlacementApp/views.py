from django.shortcuts import render
from FileAnalyzeApp.models import ExcelStudents
from MigrationApp.models.SystemModels import UniversityDepartment
from MigrationApp.models.ActorModels import ApplyingStudent
from MigrationApp.models.SystemModels import University
from MigrationApp.constants import *

# Create your views here.
def GetStudents(request):
    students = ExcelStudents.objects.all()
    universities = University.objects.all()

    for stu in students:
        for tempUniversity in universities:
            if(stu.firstPrefUni == tempUniversity.name):
                universityDepartments = tempUniversity.university_departments.all()
                for currentDepartment in universityDepartments:
                    print("hahaha")
                    print(TURKISH_DEPARTMENT.get(stu.department))
                    if TURKISH_DEPARTMENT.get(stu.department) == currentDepartment.department and currentDepartment.quotaPlacement > 0:
                        #stu.update(placedUni=tempUniversity)
                        stu.placedUni = tempUniversity
                        stu.save(update_fields=["placedUni"])
                        tempQuota = currentDepartment.quotaPlacement
                        tempQuota = tempQuota - 1
                        currentDepartment.quotaPlacement = tempQuota
                        currentDepartment.save(update_fields=["quotaPlacement"])
                        #currentDepartment.update(tempQuota)
                        print("I am here")
                        print(tempUniversity.name)
                        break
                break




    return render(request, 'placementExample.html', {})

def PlaceStudent(studentList):
    #sorted_by_transcript = sorted(studentList, key=lambda tup: tup[5])#, reverse=True)
    for stu in studentList:
        print("TRANSCRIPT: ", stu.transcriptPoints, " TOTAL: ", stu.totalPoints)

    return