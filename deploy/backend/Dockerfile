FROM python:3.9 as deploy

COPY ./deploy/backend/requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

COPY ./deploy/backend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY ./backend/app /app/app
WORKDIR /app/
ENV PYTHONPATH=/app

CMD ["/entrypoint.sh"]

FROM deploy as dev

COPY ./deploy/backend/requirements-dev.txt /tmp/requirements-dev.txt
RUN pip install -r /tmp/requirements-dev.txt

COPY ./backend /app