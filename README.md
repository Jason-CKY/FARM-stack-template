# FARM stack developer environment

This repo contains the template code for a FARM (FastAPI, React, Mongo-db) stack for a web application to start off with. It contains docker-compose files to quickly setup the stack for development environment without any installation. It includes a todo CRUD operations, as well as user authentication/registration system.

<hr>

## Credits

* This repo uses snippets from [fastapi-react-mongodb](https://github.com/ankushjain2001/fastapi-react-mongodb).
* The protected-routes authentication component is adapted from [Tyler McGinnis's example](https://ui.dev/react-router-protected-routes-authentication).

<hr>

## Features

- **[FastAPI](https://github.com/tiangolo/fastapi)** (backend server)
- **[FastAPIUsers](https://github.com/frankie567/fastapi-users)** (authentication system)
- **[React](https://reactjs.org/)** (frontend library)
- **[Typescript](https://www.typescriptlang.org/)** (typescript library)
- **[React-Bootstrap](https://github.com/react-bootstrap/react-bootstrap)** (frontend styling library)
- **[React-Icons](https://github.com/react-icons/react-icons)** (frontend styling library)
- **[Ant-Design](https://ant.design/docs/react/introduce)** (React UI library)
- **[MongoDB](https://github.com/mongodb/mongo)** (database server)
- **[Motor](https://github.com/mongodb/motor)** (async MongoDB connector for Python)

<hr>

## Tech-Stack

### Front-end

Front-end is created using [Create-React-App](https://create-react-app.dev/), with Typescript template.

### Back-end

Back-end is written in Python using [FastAPI](https://fastapi.tiangolo.com/).

### Database

Data is stored using [MongoDB](https://www.mongodb.com/), and [Minio](https://min.io/) as the object storage.

#### Pagination for mongodb

Add a `limit` and `skip` parameters to the bulk `get` request, and use them in the filtering function of the database instead of fetching all the documents from the database and limiting them in the application.

* https://stackoverflow.com/questions/67571946/how-to-implement-pagination-for-fastapi-with-mongo-dbmotor
* https://www.codementor.io/@arpitbhayani/fast-and-efficient-pagination-in-mongodb-9095flbqr
* https://medium.com/swlh/mongodb-pagination-fast-consistent-ece2a97070f3

<hr>

## Setting up developer environment

Run `make help` for the list of quick Make commands available. This template includes a `docker-compose.yml` file that sets up the FARM stack development environment that watches for changes in both fastapi and react code and re-compiles on the fly. This is a convenient way to get started on the development without installing any npm or python packages.

<hr>

## Screenshots

### Landing Page
![login page](https://user-images.githubusercontent.com/27609953/189017837-3c43fe26-c4e2-4efe-86c4-6844d95644e8.png)

![register page](https://user-images.githubusercontent.com/27609953/189017856-4474169b-1b99-4f1e-b91c-65b912e62dd5.png)

### Todo Page
![Todo Page](https://user-images.githubusercontent.com/27609953/189018393-3882fc86-a26c-4ac8-9bc6-3a94f0cf9ab8.png)

### Backend Swagger UI
![backend swagger UI](https://user-images.githubusercontent.com/27609953/189018000-deba3755-4fc2-4ed5-82df-39c9defa68d3.png)

<hr>

## Deployment

This template includes production deployment to either docker containers or kubernetes. 

### Docker deployment

`make start`

### Kubernetes deployment

`kubectl apply -f ./deploy/kubernetes`

<hr>

## Useful VSCode extensions

* Prettier
* Babel Javascript
* ES7+ React/Redux/React-Native snippets
* Typescript React code snippets

<hr>

## Useful Links

* https://www.mongodb.com/community/forums/t/when-to-close-pymongo-client/161623/2
* https://www.mongodb.com/developer/languages/python/farm-stack-fastapi-react-mongodb/
