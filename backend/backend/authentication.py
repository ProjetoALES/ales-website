import requests
from django.contrib.auth.models import User, AnonymousUser
from rest_framework import exceptions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.settings import api_settings


class NoJWTToken(AccessToken):
    def verify(self):
        """
        Performs additional validation steps which were not performed when this
        token was decoded.  This method is part of the "public" API to indicate
        the intention that it may be overridden in subclasses.
        """
        # According to RFC 7519, the "exp" claim is OPTIONAL
        # (https://tools.ietf.org/html/rfc7519#section-4.1.4).  As a more
        # correct behavior for authorization tokens, we require an "exp"
        # claim.  We don't want any zombie tokens walking around.
        self.check_exp()


class Auth0JWTAuthentication(JWTAuthentication):
    """Auth0JWTAuthentication

    Modifies the original implementation to create or update
    users when authenticating
    """

    def get_header(self, request):
        return super().get_header(request)

    def get_raw_token(self, header):
        return super().get_raw_token(header)

    def authenticate(self, request):
        """Save the request for later"""
        self.request = request
        header = self.get_header(request)
        if header is None:
            return None

        raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)

        return self.get_user(validated_token), validated_token

    def get_validated_token(self, raw_token):
        return super().get_validated_token(raw_token)

    def get_by_username(self, payload):
        user = User.objects.filter(username=payload["sub"]).only("username").first()
        return getattr(user, "username", None)

    def get_user(self, validated_token):
        # If its a new user
        if self.get_by_username(validated_token) is None:
            return AnonymousUser()

        # Proceed as normal
        return super().get_user(validated_token)
