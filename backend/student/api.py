from django.core.files.storage import default_storage
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_condition import Or
from backend.permissions import HasValidToken
from backend.authentication import Auth0JWTAuthentication
from .serializers import UploadedDocumentSerializer


class StudentProofUpload(GenericViewSet):
    permission_classes = [Or(IsAuthenticated, HasValidToken)]
    lookup_url_kwarg = "user_id"
    serializer_class = UploadedDocumentSerializer

    @action(detail=True, methods=["post"])
    def upload(self, request, user_id=None):
        if not request.user.is_authenticated:
            username = self.request.auth["sub"]
            # If the token user is not the same from the request
            if user_id != username:
                raise PermissionDenied(
                    "Provided user_id does not match JWT's signature"
                )

        else:
            # If the user has a certain scope, allow them to upload files
            # TODO: Only allow admins(?) to upload files on behalf of another user
            pass

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data["file"]

        file_path = f"student_proofs/{user_id}"
        url = default_storage.url(default_storage.save(file_path, file)).split("?")[0]
        return Response({"url": url})
