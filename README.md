# Members Club

The project represents a simple web app. Basically, it has a list of people and a registration form. Data is stored in-memory, validation is present. Seamless user experience is provided by WebSockets, not by API polling.

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

Make sure you have [`Docker Engine`](https://docs.docker.com/engine/) and [`Docker Compose`](https://docs.docker.com/compose/install/) installed on your machine. If you don't and you use Windows or macOS, consider installing [`Docker Desktop`](https://docs.docker.com/get-docker/), it includes all needed tools. Note that `Docker Compose` version must be at least `2.0.0`.

<details><summary><b>Windows</b></summary>

1. Verify installation of `Docker` and `Docker Compose` 2.0.0+:
    ```bash
    docker -v && docker-compose -v
    ```
    
2. Clone the repository:
    ```bash
    git clone https://github.com/VengerAndrey/MembersClub.git
    ```

3. Navigate inside the repository directory:
    ```bash
    cd MembersClub
    ```

4. Start the application with the command:
    ```bash
    docker-compose up -d
    ```

5. Wait a few seconds after containers are created and then navigate to [`localhost:4200`](http://localhost:4200/).

</details>

<details><summary><b>Linux</b></summary>

1. Verify installation of `Docker` and `Docker Compose` 2.0.0+:
    ```bash
    docker version && docker compose version
    ```
    
2. Clone the repository:
    ```bash
    git clone https://github.com/VengerAndrey/MembersClub.git
    ```

3. Navigate inside the repository directory:
    ```bash
    cd MembersClub
    ```

4. Start the application with the command:
    ```bash
    docker compose up -d
    ```

5. Wait a few seconds after containers are created and then navigate to [`localhost:4200`](http://localhost:4200/).

</details>

## Usage and clean-up

<details><summary><b>Windows</b></summary>

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

</details>

<details><summary><b>Linux</b></summary>

To see logs run the following command:
```bash
docker compose logs api
```

To stop application run:
```bash
docker compose down
```
You can restart it with mentioned `up` command. If you want to run it as a foreground process and view all logs you may omit `-d` flag.

To clean up run:
```bash
docker compose down -v --rmi all --remove-orphans
```

</details>

## Troubleshooting

### Ports
It is possible that you run some other programs on ports `4000` and `4200`, which are used to serve this application. If you do so, consider altering `docker-compose.yml`:
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

### Docker daemon
If you use Linux and get Docker daemon error similar to the following:
```bash
Got permission denied while trying to connect to the Docker daemon socket at unix
/var/run/docker.sock: connect: permission denied
```

Consider running the command:
```bash
sudo chmod 666 /var/run/docker.sock
```