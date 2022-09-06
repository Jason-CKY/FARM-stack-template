from beanie import PydanticObjectId
from fastapi_users.db import BeanieBaseUser, BeanieUserDatabase


class User(BeanieBaseUser[PydanticObjectId]):
    firstName: str
    lastName: str


async def get_user_db():
    yield BeanieUserDatabase(User)
