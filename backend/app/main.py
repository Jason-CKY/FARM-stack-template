from beanie import init_beanie
from app.schemas.Users import UserCreate, UserRead, UserUpdate
from app.schemas.Todo import Todo
from app.core.auth import auth_backend, current_active_user, fastapi_users, gitlab_oauth_client, github_oauth_client
from app.database.users import User

from pathlib import Path
from fastapi import FastAPI, Depends
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.staticfiles import StaticFiles
from app.core.database import client as mongodb_client
from app.core.database import database as db
from app.core.settings import settings
from app.routers.todo import router as todo_router

app = FastAPI(
    title=settings.app_name,
    description=settings.app_description,
    version=settings.app_version,
    openapi_url="/api/openapi.json",
    docs_url=None,
    redoc_url=None
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


@app.get("/api", include_in_schema=False)
def custom_docs():
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title=app.title,
        swagger_favicon_url='/static/logo.png'
    )


@app.get("/")
def root(user: UserRead = Depends(current_active_user)):
    return user


app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/api/auth/jwt",
    tags=["auth"]
)
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/api/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/api/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/api/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_oauth_router(
        gitlab_oauth_client,
        auth_backend,
        settings.auth_secret_key,
        associate_by_email=False,
        redirect_url='http://localhost:8000/api/auth/gitlab/callback'
    ),
    prefix="/api/auth/gitlab",
    tags=["auth", "gitlab"],
)
app.include_router(
    fastapi_users.get_oauth_router(
        github_oauth_client,
        auth_backend,
        settings.auth_secret_key,
        associate_by_email=False,
        redirect_url='http://localhost:8000/api/auth/github/callback'
    ),
    prefix="/api/auth/github",
    tags=["auth", "github"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/api/users",
    tags=["users"],
)
app.include_router(todo_router, prefix="/api/v1", tags=["todo"])

# serve all files in /static/*
app.mount(
    '/static',
    StaticFiles(directory=Path(__file__).parent / 'static'),
    name='static'
)
