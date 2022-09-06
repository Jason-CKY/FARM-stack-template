from beanie import PydanticObjectId
from fastapi_users import schemas


class UserRead(schemas.BaseUser[PydanticObjectId]):
    """
        id (ID) Unique identifier of the user. It matches the type of your ID, like UUID or integer.
        email (str) Email of the user. Validated by email-validator.
        is_active (bool) Whether or not the user is active. If not, login and forgot password requests will be denied. Defaults to True.
        is_verified (bool) Whether or not the user is verified. Optional but helpful with the verify router logic. Defaults to False.
        is_superuser (bool) Whether or not the user is a superuser. Useful to implement administration logic. Defaults to False.

        Modify the below lines to add more fields for the user
        WARNING: You must also modify the same lines in the
        UserCreate model below
    """
    firstName: str
    lastName: str


class UserCreate(schemas.BaseUserCreate):
    """
        Dedicated to user registration, which consists of compulsory email and password fields
        Modify the below lines to add more fields for the user
        WARNING: You must also modify the same lines in the
        User model above
    """
    firstName: str
    lastName: str


class UserUpdate(schemas.BaseUserUpdate):
    """
        Dedicated to user profile update, which adds an optional password field;
        This class Extends/Inherits the User class
    """
    firstName: str
    lastName: str
