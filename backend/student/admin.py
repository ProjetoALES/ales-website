from django.contrib import admin
from .models import Student, Guardian, EmergencyContact

# Register your models here.

admin.site.register(Student)
admin.site.register(Guardian)
admin.site.register(EmergencyContact)
