from rest_framework import serializers
from .models import Student, Guardian, EmergencyContact
from backend.fields import UploadedFileField


class UploadedDocumentSerializer(serializers.Serializer):
    file = UploadedFileField(
        required=True,
        max_size=5 * 1000 * 1000,
        content_types=["application/pdf", "image/jpeg", "image/png"],
    )


class GuardianSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guardian
        fields = "__all__"
        read_only_fields = ("user", "student")


class EmergencyContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyContact
        fields = "__all__"
        read_only_fields = ("student",)


class StudentSerializer(serializers.ModelSerializer):
    guardian = GuardianSerializer(required=False)
    emergency_contact = EmergencyContactSerializer()

    class Meta:
        model = Student
        fields = "__all__"
        read_only_fields = ("user",)
