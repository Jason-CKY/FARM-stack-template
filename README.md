# FARM stack developer environment

This repo contains the template code for a FARM (FastAPI, React, Mongo-db) stack for a web application to start off with. It contains docker-compose files to quickly setup the stack for development environment without any installation. It includes a todo CRUD operations, as well as user authentication/registration system.

<hr>

## Credits

- This repo uses snippets from [fastapi-react-mongodb](https://github.com/ankushjain2001/fastapi-react-mongodb).
- The protected-routes authentication component is adapted from [Tyler McGinnis's example](https://ui.dev/react-router-protected-routes-authentication).

<hr>

## Features

- **[FastAPI](https://github.com/tiangolo/fastapi)** (backend server)
- **[FastAPIUsers](https://github.com/frankie567/fastapi-users)** (authentication system)
- **[React](https://reactjs.org/)** (frontend library)
- **[Typescript](https://www.typescriptlang.org/)** (typescript library)
- **[Tailwind](https://tailwindcss.com)** (CSS Styling library)
- **[Mantine](https://mantine.dev)** (react component library)
- **[React-Icons](https://github.com/react-icons/react-icons)** (frontend styling library)
- **[MongoDB](https://github.com/mongodb/mongo)** (database server)
- **[Motor](https://github.com/mongodb/motor)** (async MongoDB connector for Python)

<hr>

## Integrating Tailwind with existing component libraries

Refer to here to see how to integrate tailwind into material UI component library. Right now tailwind css is added with important: true so it overwrites all styling by component libraries. Tailwind css will clash with Bootstrap UI Component library if the classNames are the same. Since the tailwind css config is set to important: true, tailwind's css will overwrite Bootstrap UI. Further work needed to replace all Bootstrap components with Material UI component or work from scratch with Tailwind.

## Tech-Stack

### Front-end

Front-end is created using [Create-React-App](https://create-react-app.dev/), with Typescript template.

### Back-end

Back-end is written in Python using [FastAPI](https://fastapi.tiangolo.com/). Documentation is available on http://localhost:8000/api

### Database

Data is stored using [MongoDB](https://www.mongodb.com/), and [Minio](https://min.io/) as the object storage.

#### Pagination for mongodb

Add a `limit` and `skip` parameters to the bulk `get` request, and use them in the filtering function of the database instead of fetching all the documents from the database and limiting them in the application.

- https://stackoverflow.com/questions/67571946/how-to-implement-pagination-for-fastapi-with-mongo-dbmotor
- https://www.codementor.io/@arpitbhayani/fast-and-efficient-pagination-in-mongodb-9095flbqr
- https://medium.com/swlh/mongodb-pagination-fast-consistent-ece2a97070f3

<hr>

## Setting up developer environment

Run `make help` for the list of quick Make commands available. This template includes a `docker-compose.yml` file that sets up the FARM stack development environment that watches for changes in both fastapi and react code and re-compiles on the fly. This is a convenient way to get started on the development without installing any npm or python packages.

<hr>

## OAuth Integrations

[FastAPI-Users](https://fastapi-users.github.io/fastapi-users/10.2/configuration/oauth/) OAuth Routers is used to connect to various oauth/openid providers. This template provides a Github and Gitlab OAuth logins but it is simple to extend this to other providers by adding the corresponding [client](./backend/app/core/auth.py) and [routers](./backend/app/main.py).

### OAuth Endpoints

FastAPI-Users exposes 2 endpoints for OAuth: `/authorize` and `/callback`. `GET /authorize` will return you the URL to redirect the user to the relevant provider for authentication. Set the redirect URI in the provider client settings to the `/callback` URL to generate the access token to login.

### Frontend Integration for OAuth

Clicking on `Login with Github` button will call the backend's corresponding `/authorize` endpoint to retrieve the authorization endpoint with redirect_uri, scopes, respond type, client id and state. The frontend will then redirect the user to the authorization endpoint to be authorized, before redirecting back to the login page with the authorization code. It then calls the backend's `/callback` endpoint with the authorization code and state parameters to retrieve the access token.

### Existing account association

If a user with the same e-mail address already exists, an HTTP 400 error will be raised by default.

You can however choose to automatically link this OAuth account to the existing user account by setting the associate_by_email flag:

```python
app.include_router(
    fastapi_users.get_oauth_router(
        google_oauth_client,
        auth_backend,
        "SECRET",
        associate_by_email=True,
    ),
    prefix="/auth/google",
    tags=["auth"],
)
```

Bear in mind though that it can lead to security breaches if the OAuth provider does not validate e-mail addresses. How?

- Let's say your app support an OAuth provider, Merlinbook, which does not validate e-mail addresses.
- Imagine a user registers to your app with the e-mail address lancelot@camelot.bt.
- Now, a malicious user creates an account on Merlinbook with the same e-mail address. Without e-mail validation, the malicious user can use this account without limitation.
- The malicious user authenticates using Merlinbook OAuth on your app, which automatically associates to the existing lancelot@camelot.bt.
- Now, the malicious user has full access to the user account on your app 😞

## Screenshots

### Landing Page

![login page](https://user-images.githubusercontent.com/27609953/207642626-2659ea03-1849-4c4d-8793-58da18369eb7.png)

![register page](https://user-images.githubusercontent.com/27609953/207642712-1e9899a4-48e5-462b-8c9c-982804e5af11.png)

### Todo Page

![Todo Page](https://user-images.githubusercontent.com/27609953/207642920-66d2e521-6e78-426d-bfcb-dc26a4a2f9f6.png)

### Backend Swagger UI

![backend swagger UI](https://user-images.githubusercontent.com/27609953/207643186-fbc16a42-b99e-4032-9b55-0ca4e08294a5.png)

<hr>

## Deployment

This template includes production deployment to either docker containers or kubernetes.

### Docker deployment

`make start`

### Kubernetes deployment

`kubectl apply -f ./deploy/kubernetes`

<hr>

## Useful VSCode extensions

- Prettier
- Babel Javascript
- ES7+ React/Redux/React-Native snippets
- Typescript React code snippets

<hr>

## Useful Links

- https://www.mongodb.com/community/forums/t/when-to-close-pymongo-client/161623/2
- https://www.mongodb.com/developer/languages/python/farm-stack-fastapi-react-mongodb/
