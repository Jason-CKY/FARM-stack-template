from pathlib import Path
from fastapi import FastAPI
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.staticfiles import StaticFiles
from starlette.requests import Request

from app.core.settings import settings

import time 

app = FastAPI(
    title=settings.app_name,
    description=settings.app_description,
    version=settings.app_version,
    docs_url=None,
    redoc_url=None
)
app.mount(
    '/static',
    StaticFiles(directory=Path(__file__).parent / 'static'),
    name='static'
)


@app.get("/", include_in_schema=False)
def custom_docs():
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title=app.title,
        swagger_favicon_url='/static/logo.png'
    )


def long_io_task():
    time.sleep(5)

def long_cpu_task():
    for i in range(int(1e8)):
        ans = i*i


@app.post("/query")
def query(request: Request):
    # time.sleep(2)
    # long_io_task()
    long_cpu_task()
    data = {"success": False}
    return 