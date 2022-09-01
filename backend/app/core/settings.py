import logging
import os
from pathlib import Path
from pydantic import BaseSettings


class Settings(BaseSettings):
    app_name: str = os.getenv('APP_NAME', 'my-app')
    app_version: str = os.getenv('APP_VERSION', '0.0.1')

    app_description: str

    log_level: str = os.getenv('LOG_LEVEL', 'DEBUG')
    log_format: str = '%(asctime)s - %(name)s:%(funcName)s:%(lineno)d - %(levelname)s - %(message)s'

settings = Settings(
    app_description=(Path(__file__).parent.parent /
                     'static/documentation.md').read_text(encoding='utf-8')
)

# configure project-specific logger
loggers = [logging.getLogger(name) for name in logging.root.manager.loggerDict]
ch = logging.StreamHandler()
ch.setFormatter(logging.Formatter(settings.log_format))
ch.setLevel(settings.log_level)
for logger in loggers:
    logger.handlers = []
    logger.addHandler(ch) 
