from import_export import resources
from .models import ExcelStudents


class ExcelStudentsResource(resources.ModelResource):
    class Meta:
        model = ExcelStudents