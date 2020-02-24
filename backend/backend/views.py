from django.contrib.auth.models import User
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import RetrieveModelMixin
from .serializers import CurrentUserSerializer


class CurrentUserViewset(RetrieveModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = CurrentUserSerializer
    single_instance_viewset = True

    def get_object(self):
        return self.request.user
