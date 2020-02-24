from django.db import models
from django.contrib.auth.models import User


class Volunteer(models.Model):
    """Volunteer

    Volunteer model with basic volunteer info
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    @classmethod
    def create_volunteer(cls, user, data):
        obj_data = {
            "user": user,
        }
        obj = cls(obj_data)
        obj.save()
        return obj
