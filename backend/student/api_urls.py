from backend.router import base_router
from backend.views import CurrentUserViewset
from .api import StudentProofUpload

app_name = "student_api"

base_router.register("student-proof", StudentProofUpload, basename="student-proof")

urlpatterns = []
