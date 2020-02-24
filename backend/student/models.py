from django.db import models
from django.contrib.auth.models import User


class Student(models.Model):
    """Student

    Student model with basic student info
    """

    YEAR = [
        ("EF7", "7º do Fundamental"),
        ("EF8", "8º do Fundamental"),
        ("EF9", "9º do Fundamental"),
        ("EM1", "1º do Médio"),
        ("EM2", "2º do Médio"),
        ("EM3", "3º do Médio"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    school = models.TextField("Escola", max_length=200)
    year = models.TextField("Série", choices=YEAR, max_length=3)
    student_proof_url = models.URLField("URL do atestado de matrícula")

    @classmethod
    def create_student(cls, user, data):
        obj_data = {
            "user": user,
            "school": data["student"]["school"],
            "year": data["student"]["year"],
            "student_proof_url": data["student"]["student_proof_url"],
        }
        obj = cls(obj_data)
        obj.save()
        return obj


class Guardian(models.Model):
    """Guardian

    A student's guardian
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    student = models.OneToOneField(Student, on_delete=models.CASCADE)
    phone = models.TextField("Telefone", max_length=20)
    cpf = models.TextField("CPF", max_length=14)

    @classmethod
    def create_guardian(cls, student, data):
        user_data = {
            "username": f"{student.user.username}_guardian",
            "first_name": data["guardian"]["first_name"],
            "last_name": data["guardian"]["last_name"],
            "email": data["guardian"]["email"],
        }
        user = User.objects.create_user(**user_data)
        obj_data = {
            "user": user,
            "student": student,
            "phone": data["guardian"]["phone"],
            "cpf": data["guardian"]["cpf"],
        }
        obj = cls(obj_data)
        obj.save()
        return obj


class EmergencyContact(models.Model):
    """EmergencyContact

    A Student's emergency contact
    """

    student = models.OneToOneField(Student, on_delete=models.CASCADE)
    name = models.TextField("Nome", max_length=200)
    phone = models.TextField("Telefone", max_length=20)

    @classmethod
    def create_emergency_contact(cls, student, data):
        obj_data = {
            "student": student,
            "name": data["emergency_contact"]["name"],
            "phone": data["emergency_contact"]["phone"],
        }
        obj = cls(obj_data)
        obj.save()
        return obj
