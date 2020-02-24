from rest_framework import serializers
from .models import Profile, Documentation


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
        read_only_fields = ("user",)


class DocumentationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Documentation
        fields = "__all__"
        read_only_fields = ("user",)
