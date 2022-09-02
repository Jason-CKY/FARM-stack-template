from pathlib import Path
from fastapi import FastAPI
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.database import client as mongodb_client
from app.core.settings import settings
from app.routers import todo

app = FastAPI(
    title=settings.app_name,
    description=settings.app_description,
    version=settings.app_version,
    docs_url=None,
    redoc_url=None
)

origins = ["https://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.on_event("shutdown")
async def shutdown_db_client():
    mongodb_client.close()


@app.get("/", include_in_schema=False)
def custom_docs():
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title=app.title,
        swagger_favicon_url='/static/logo.png'
    )


app.include_router(todo.router, prefix="/api/v1")

# serve all files in /static/*
app.mount(
    '/static',
    StaticFiles(directory=Path(__file__).parent / 'static'),
    name='static'
)
