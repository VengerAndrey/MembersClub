# Members Club

The project represents a simple web app. Basically, it has a list of people and a registration form. Data is stored in-memory, validation is present. Seamless user experience is provided by WebSockets, API polling is not present.

## Tech stack

### API
* **Node.js + TypeScript**
* GraphQL server: **Apollo Server Express**, WebSocket subscriptions
* GraphQL codegen: **Nexus**
* Custom logging

### Client
* **Angular**
* GraphQL client: **Apollo Angular**
* Real-time WebSocket subscriptions

### Deployment
* **Docker Compose**

## Installation

Make sure you have [Docker Engine](https://docs.docker.com/engine/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine. If you don't, consider installing [Docker Desktop](https://docs.docker.com/get-docker/), it includes all needed tools.

Firstly, clone the repository:
```bash
git clone https://github.com/VengerAndrey/MembersClub.git
```

Navigate inside repository folder:
```bash
cd MembersClub
```

And start the application with the command:
```bash
docker-compose up -d
```

Wait a few seconds after containers have been created and then navigate to [`localhost:4200`](http://localhost:4200/).

To see logs run the following command:
```bash
docker-compose logs api
```

To stop application run:
```bash
docker-compose down
```
You can restart it with mentioned `up` command. If you want to run it as a foreground process and view all logs you may omit `-d` flag.

To clean up run:
```bash
docker-compose down -v --rmi all --remove-orphans
```

## Troubleshooting

It is possible that you run some other programs on ports **4000** and **4200**, which are used to serve this application. If you do so, you should consider altering `docker-compose.yml`:
```diff
version: '2'
services:
  api:
    build: members-club-api
    ports:
-      - "4000:4000"
+      - "4001:4000"
  
  client:
    build: members-club-client
    ports:
-      - "4200:80"
+      - "4201:80"
```

Do not forget to change API endpoint in `members-club-client\src\app\graphql.module.ts`:
```diff
- const uri = 'localhost:4000/graphql'
+ const uri = 'localhost:4001/graphql'
```