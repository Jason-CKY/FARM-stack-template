from beanie import init_beanie
from app.schemas.Users import UserCreate, UserRead, UserUpdate
from app.schemas.Todo import Todo
from app.core.auth import auth_backend, fastapi_users, gitlab_oauth_client, github_oauth_client
from app.database.users import User

from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.database import client as mongodb_client
from app.core.database import database as db
from app.core.settings import settings
from app.routers.todo import router as todo_router
from app.routers.oauth import get_oauth_router

app = FastAPI(
    title=settings.app_name,
    description=settings.app_description,
    version=settings.app_version
)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    await init_beanie(
        database=db,
        document_models=[User, Todo],
    )


@app.on_event("shutdown")
async def shutdown_db_client():
    mongodb_client.close()


@app.get("/")
def root():
    return {"Hello": "World"}


app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"]
)
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    get_oauth_router(
        gitlab_oauth_client,
        auth_backend,
        fastapi_users.get_user_manager,
        settings.auth_secret_key,
        associate_by_email=False,
        redirect_url='http://localhost:3000/login'
    ),
    prefix="/auth/gitlab",
    tags=["auth", "gitlab"],
)
app.include_router(
    get_oauth_router(
        github_oauth_client,
        auth_backend,
        fastapi_users.get_user_manager,
        settings.auth_secret_key,
        associate_by_email=False,
        redirect_url='http://localhost:3000/login'
    ),
    prefix="/auth/github",
    tags=["auth", "github"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)
app.include_router(todo_router, prefix="/v1", tags=["todo"])

# serve all files in /static/*
app.mount(
    '/static',
    StaticFiles(directory=Path(__file__).parent / 'static'),
    name='static'
)
