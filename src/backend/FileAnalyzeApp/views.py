from django.shortcuts import render
from FileAnalyzeApp import *
from dbint import *
from tablib import Dataset
import openpyxl
from http.client import HTTPResponse
from django.shortcuts import render
import pandas as pd
import os
from django.core.files.storage import FileSystemStorage
from .models import ExcelStudents
from PyPDF2 import PdfFileWriter, PdfFileReader
import io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from docx import *
from io import StringIO
from docx.shared import Inches, Cm, Pt
from django.http import HttpResponse

def index(request):
    if "GET" == request.method:
        return render(request, 'index.html', {})
    else:
        excel_file = request.FILES["excel_file"]

        # you may put validations here to check extension or file size

        wb = openpyxl.load_workbook(excel_file)

        # getting a particular sheet by name out of many sheets
        worksheet = wb["Placed"]
        print >>sys.stderr, (worksheet)

        excel_data = list()
        # iterating over the rows and
        # getting value from each cell in row
        for row in worksheet.iter_rows():
            row_data = list()
            for cell in row:
                row_data.append(str(cell.value))
            excel_data.append(row_data)

        return render(request, 'index.html', {"excel_data":excel_data})

    # Create your views here.


def Import_Excel_pandas(request):
    if request.method == 'POST' and request.FILES['myfile']:
        myfile = request.FILES['myfile']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        empexceldata = pd.read_excel(filename)
        dbframe = empexceldata
        for dbframe in dbframe.itertuples():
            #print >>sys.stderr, (dbframe)
            obj = ExcelStudents.objects.create(firstName=dbframe.FirstName, Lastname=dbframe.Lastname,
                                          studentID=dbframe.StudentIDNumber,
                                          faculty=dbframe.Faculty, department=dbframe.Department, transcriptPoints=dbframe.TranscriptPoints,
                                          totalPoints=dbframe.TotalPoints,
                                          duration=dbframe.DurationPreferred, firstPrefUni=dbframe.PreferredUniversity1, secondPrefUni=dbframe.PreferredUniversity2,
                                               thirdPrefUni=dbframe.PreferredUniversity3, fourthPrefUni=dbframe.PreferredUniversity4,
                                               fifthPrefUni=dbframe.PreferredUniversity5)
            obj.save()
        return render(request, 'import_excel_db.html', {
            'uploaded_file_url': uploaded_file_url
        })
    return render(request, 'import_excel_db.html', {})

def Import_excel(request):
    if request.method == 'POST':
        ExcelStudents = ExcelStudentsResource()
        dataset = Dataset()
        new_employee = request.FILES['myfile']
        data_import = dataset.load(new_employee.read())
        result = ExcelStudentsResource.import_data(dataset, dry_run=True)
        if not result.has_errors():
            ExcelStudentsResource.import_data(dataset, dry_run=False)
    return render(request, 'import_excel_db.html', {})

def ReadAndWritePdf(request):
    packet = io.BytesIO()
    can = canvas.Canvas(packet, pagesize=(800, 800))
    can.setFont('Helvetica', 10)  # Set Font and Size
    can.drawString(80, 501, "Berkay")  # Name
    can.drawString(80, 481, "Erdem")  # Surname
    can.drawString(490, 501, "21801863")  # ID
    can.drawString(490, 481, "CS")  # Department
    can.drawString(170, 440, "Institution Example")  # Institution
    can.drawString(490, 453, "2023-2024")  # Academic Year
    can.drawString(490, 429, "Fall")  # Semester

    bottomPadding = 336
    bottomPaddingDifference = 23
    for i in range(1, 10):
        can.drawString(50, bottomPadding, "CS319")  # Course 1 Code
        can.drawString(95, bottomPadding, "Software Engineering")  # Course 1 Name
        can.drawString(360, bottomPadding, "3")  # Course 1 Credits
        can.drawString(395, bottomPadding, "CSXXX Computer Engineering")  # Course 1 required
        can.drawString(640, bottomPadding, "3")  # Course 1 req credits
        can.drawString(670, bottomPadding, "Exemptions Example")  # Course 1 req exemptions
        bottomPadding = bottomPadding - bottomPaddingDifference

    # can.drawString(50, 313, "CS421")  # Course 2 Code

    can.save()

    # move to the beginning of the StringIO buffer
    packet.seek(0)

    # create a new PDF with Reportlab
    new_pdf = PdfFileReader(packet)
    # read your existing PDF
    existing_pdf = PdfFileReader(open("original.pdf", "rb"))
    output = PdfFileWriter()
    # add the "watermark" (which is the new pdf) on the existing page
    page = existing_pdf.getPage(0)
    page.mergePage(new_pdf.getPage(0))
    output.addPage(page)
    # finally, write "output" to a real file
    outputStream = open("destination.pdf", "wb")
    output.write(outputStream)
    outputStream.close()

    return render(request, 'import_excel_db.html', {})

def createWordFile(request):
    document = Document()
    docx_title = "TEST_DOCUMENT.docx"
    document.add_paragraph('Dear Sir or Madam:')

    table = document.add_table(0, 0)  # we add rows iteratively
    table.style = 'TableGrid'
    first_column_width = 5
    second_column_with = 10
    table.add_column(Cm(first_column_width))
    table.add_column(Cm(second_column_with))
    table.add_row()
    row = table.rows[0]
    row.cells[0].text = "Deneme"
    f = io.BytesIO()
    document.save(docx_title + '.docx')
    document.save(f)
    length = f.tell()
    f.seek(0)
    response = HttpResponse(
        f.getvalue(),
        content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
    response['Content-Disposition'] = 'attachment; filename=' + docx_title
    response['Content-Length'] = length
    return response