import logging
import os
from pathlib import Path
from pydantic import BaseSettings


class Settings(BaseSettings):
    app_name: str = os.getenv('APP_NAME', 'my-app')
    app_version: str = os.getenv('APP_VERSION', '0.0.1')

    app_description: str

    # auth
    auth_secret_key: str = os.getenv(
        'AUTH_SECRET',
        'ae7ccace18673a05bc07e170ebcd543091ce3ac51ffde584eb28576796092462'
    )
    session_lifetime_seconds: int = int(
        os.getenv('AUTH_SESSION_LIFETIME_SECONDS', '3600')
    )

    # oauth
    # Gitlab
    gitlab_client_id: str = os.getenv('OAUTH_GITLAB_CLIENT_ID')
    gitlab_client_secret: str = os.getenv('OAUTH_GITLAB_CLIENT_SECRET')
    gitlab_configuration_endpoint: str = os.getenv(
        'OAUTH_GITLAB_CONFIGURATION_ENDPOINT'
    )

    # Github
    github_client_id: str = os.getenv('OAUTH_GITHUB_CLIENT_ID')
    github_client_secret: str = os.getenv('OAUTH_GITHUB_CLIENT_SECRET')

    # mongodb connection variables
    mongo_host: str = os.getenv('MONGODB_HOST', 'mongo')
    mongo_port: str = os.getenv('MONGODB_PORT', '27017')
    mongo_user: str = os.getenv('MONGODB_USER')
    mongo_password: str = os.getenv('MONGODB_PASSWORD')
    mongodb_uri: str = f"mongodb://{mongo_user}:{mongo_password}@{mongo_host}:{mongo_port}"

    log_level: str = os.getenv('LOG_LEVEL', 'DEBUG')
    log_format: str = '%(asctime)s - %(name)s:%(funcName)s:%(lineno)d - %(levelname)s - %(message)s'


settings = Settings(
    app_description=(Path(__file__).parent.parent /
                     'static/documentation.md').read_text(encoding='utf-8')
)

# configure project-specific logger
logger_names = [
    'uvicorn', 'uvicorn.access', 'uvicorn.error', settings.app_name
]
ch = logging.StreamHandler()
ch.setFormatter(logging.Formatter(settings.log_format))
for logger_name in logger_names:
    logger = logging.getLogger(logger_name)
    logger.handlers = []
    logger.addHandler(ch)
    logger.setLevel(settings.log_level)

logging.getLogger("uvicorn.error").propagate = False
