from rest_framework.fields import FileField
from ..validators import FileValidator


class UploadedFileField(FileField):
    """Uploaded File Field

    Serializer field that validates an uploaded file
    """

    def __init__(self, max_size=None, min_size=None, *args, **kwargs):
        self.max_size = max_size
        self.min_size = min_size
        self.content_types = kwargs.pop("content_types", None)
        self.validators.append(
            FileValidator(self.max_size, self.min_size, self.content_types)
        )
        super().__init__(*args, **kwargs)
