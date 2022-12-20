
CS = 'CS' or 'cs'
EE = 'EE' or 'ee'
ME = 'ME' or 'me'
SPRING = 'SPRING'
FALL = 'FALL'
YEAR = 'YEAR'
PERIOD_CHOICES = [(FALL, 'FALL'), (SPRING, 'SPRING'), (YEAR, 'YEAR')]
DEPARTMENT_CHOICES = [(CS, 'CS'), (EE, 'EE'), (ME, 'ME')]
TURKISH_DEPARTMENT = {'Bilgisayar Mühendisliği': CS,}
PERIOD_TEXTS = {'BAHAR' : SPRING,'Bahar' : SPRING, 'Bahar Dönemi' : SPRING, 'Spring' : SPRING, 'GÜZ' : FALL,
                'Güz': FALL, 'Güz Dönemi': FALL, 'Fall': FALL, '1 Akademik Yıl' : YEAR}
DEPARTMENTS = [CS, EE, ME]

ASTU = 'ApplyingStudent'
FSTU = 'FormerStudent'
DEPC = 'DepartmentCoordinator'
INST = 'Instructor'
EXCC = 'ExchangeCoordinator'
EXCO = 'ExchangeOffice'
USER_TYPE_CHOICES = [
    (ASTU, ASTU),
    (FSTU, FSTU),
    (DEPC, DEPC),
    (INST, INST),
    (EXCC, EXCC),
    (EXCO, EXCO)
]

FILE_UPLOAD = 'File Upload'
NOTI_TYPES = {FILE_UPLOAD: 'File Upload'}

