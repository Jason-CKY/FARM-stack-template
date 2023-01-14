from beanie import PydanticObjectId
from typing import List
from pydantic import Field
from fastapi_users.db import BeanieBaseUser, BeanieUserDatabase, BaseOAuthAccount


class OAuthAccount(BaseOAuthAccount):
    pass


class User(BeanieBaseUser[PydanticObjectId]):
    firstName: str = None
    lastName: str = None
    oauth_accounts: List[OAuthAccount] = Field(default_factory=list)


async def get_user_db():
    yield BeanieUserDatabase(User, OAuthAccount)
