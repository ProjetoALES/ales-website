from django.contrib.auth.models import User
from rest_framework import serializers
from student.serializers import StudentSerializer
from volunteer.serializers import VolunteerSerializer
from profile_app.serializers import ProfileSerializer, DocumentationSerializer


class UserCreationSerializer(serializers.ModelSerializer):
    # student = StudentSerializer(required=False)
    # volunteer = VolunteerSerializer(required=False)
    # documentation = DocumentationSerializer(required=False)
    profile = ProfileSerializer(many=False)

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "email",
            "username",
            "profile",
            # "student",
            # "volunteer",
            # "documentation",
        ]


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]
