from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    """Profile

    User profile model with basic info that all users have
    """

    GENDER = [
        ("M", "Masculino"),
        ("F", "Feminino"),
        ("O", "Outro"),
        ("NA", "Prefiro não dizer"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birthday = models.DateField("Data de aniversário")
    gender = models.TextField("Gênero", choices=GENDER, max_length=2)
    phone = models.TextField("Telefone", max_length=20)
    cep = models.TextField("CEP", max_length=9)

    @classmethod
    def create_profile(cls, user, data):
        obj_data = {
            "user": user,
            "birthday": data["birthday"],
            "gender": data["gender"],
            "phone": data["phone"],
            "cep": data["cep"],
        }
        obj = cls(obj_data)
        obj.save()
        return obj


class Documentation(models.Model):
    """Documentation

    User ID documents
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    rg = models.TextField("RG", max_length=20)
    rgIssueDate = models.DateField("Data de emissão do RG")
    rgIssuer = models.TextField("Órgão emissor do RG", max_length=30)
    rgState = models.TextField("Estado de emissão do RG", max_length=2)

    @classmethod
    def create_documentation(cls, user, data):
        obj_data = {
            "user": user,
            "rg": data["documentation"]["rg"],
            "rgIssueDate": data["documentation"]["rgIssueDate"],
            "rgIssuer": data["documentation"]["rgIssuer"],
            "rgState": data["documentation"]["rgState"],
        }
        obj = cls(obj_data)
        obj.save()
        return obj
