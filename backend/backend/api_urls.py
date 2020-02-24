from django.urls import include, path
from .views import CurrentUserViewset

from student import api_urls as student_urls

from .router import base_router

base_router.register("me", CurrentUserViewset, basename="me")

app_name = "api"
urlpatterns = [
    path(
        "",
        include((student_urls.urlpatterns, student_urls.app_name), namespace="student"),
    )
]
urlpatterns += base_router.urls
