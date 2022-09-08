FROM node:16-buster as dev

COPY ./frontend /app
WORKDIR /app
EXPOSE 3000
CMD npm install -l; npm start

FROM dev as build

RUN npm install -l; npm run build

FROM nginx:1.23.1-alpine as production

COPY --from=build /app/build /usr/share/nginx/html
RUN chmod -R 775 /usr/share/nginx/html
COPY ./deploy/frontend/nginx.conf /etc/nginx/nginx.conf
