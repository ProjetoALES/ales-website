import os
from typing import Dict, NewType, Union, TypedDict, Any
from django.core.cache import cache
import requests
from .read_env import read_env

AUTH0_MANAGEMENT_API_TOKEN_KEY = "AUTH0_MANAGEMENT_API_TOKEN_KEY"

social_provider_secrets = read_env(
    os.environ.get("SECRETS_PATH"), "SOCIAL_PROVIDER_SECRETS"
)

AccessToken = NewType("access_token", str)
BearerToken = NewType("bearer_token", str)
TokenType = NewType("token_type", str)
ExpiresIn = NewType("expires_in", int)


class NewTokenData(TypedDict):
    access_token: AccessToken
    token_type: TokenType
    expires_in: ExpiresIn


class Auth0APIManager(object):
    """Auth0 API Manager

    Use it to simplify request-making to Auth0's APIs

    Examples:
        Retrieve a user's info

        >>> auth0 = Auth0APIManager()
        >>> response = auth0.request("/users/1234")
        >>> print(response.json())
        {'name': 'user', 'user_id': '1234'}
    """

    client_id = social_provider_secrets.get("AUTH0_MANAGEMENT_API_CLIENT_ID")
    client_secret = social_provider_secrets.get("AUTH0_MANAGEMENT_API_CLIENT_SECRET")
    audience = social_provider_secrets.get("AUTH0_MANAGEMENT_API_AUDIENCE")
    grant_type = social_provider_secrets.get("AUTH0_MANAGEMENT_API_GRANT_TYPE")
    base_url = f"https://{social_provider_secrets.get('AUTH0_DOMAIN')}"
    api_version = "v2"

    def get_request_url(self, endpoint: str) -> str:
        return f"{self.base_url}{endpoint}"

    def get_api_url(self, endpoint: str) -> str:
        api_endpoint = f"/api/{self.api_version}{endpoint}"
        return self.get_request_url(api_endpoint)

    def request(
        self, endpoint: str = "", **params: Dict[str, Any]
    ) -> requests.Response:
        """Make a request
        
        Makes a request to Auth0's Management API using local credentials.
        Defaults to making a GET request

        You can also pass any valid requests.Request parameter if you want.
        
        Args:
            endpoint (str, optional): Endpoint to make the request to. Defaults to "".
        
        Returns:
            requests.Response: The response to the request
        
        Examples:
            >>> # Get a user's data
            >>> auth0 = Auth0APIManager()
            >>> response = auth0.request("/users/1234")
            >>> print(response.json())
            {'name': 'user', 'user_id': '1234', 'email_verified': false}
            >>> # Update the user
            >>> data = { "email_verified": true }
            >>> other_response = auth0.request("/users/1234", method="PATCH", data=data)
            >>> print(other_response.json())
            {'name': 'user', 'user_id': '1234', 'email_verified': true}

        """
        authorization = (
            params.get("headers", {}).pop("Authorization", None) or self.get_token()
        )
        headers = {**params.pop("headers", {}), "Authorization": authorization}
        merged_params = {
            "method": "GET",
            "url": self.get_api_url(endpoint),
            "headers": headers,
            **params,
        }

        return requests.request(**merged_params)

    def get_cached_token(self) -> Union[BearerToken, None]:
        return cache.get(AUTH0_MANAGEMENT_API_TOKEN_KEY)

    def set_cached_token(
        self,
        access_token: AccessToken,
        token_type: TokenType,
        expires_in: ExpiresIn,
        **kwargs,
    ):
        cache.set(
            AUTH0_MANAGEMENT_API_TOKEN_KEY, f"{token_type} {access_token}", expires_in
        )

    def get_new_token(self) -> NewTokenData:
        url = self.get_request_url("/oauth/token")
        headers = {"content-type": "application/json"}
        data = {
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "audience": self.audience,
            "grant_type": self.grant_type,
        }
        response = requests.post(url, headers=headers, json=data)

        response.raise_for_status()

        return response.json()

    def get_token(self):
        # Try to return a cached token
        cached_token = self.get_cached_token()
        if cached_token is None:
            # If token is expired, fetch and cache a new one
            new_token_data = self.get_new_token()
            self.set_cached_token(**new_token_data)
            cached_token = self.get_cached_token()

        # Return the cached token
        return cached_token
