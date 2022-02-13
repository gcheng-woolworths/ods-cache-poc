# ODS Cache POC

## Start the dev server

To start server, run:

```sh
docker-compose up
```

## Server health check

```sh
curl localhost:3000/health-check
```

## Connect to mongodb

After `docker-compose` started, you can connect to mongo db via following command:

```sh
mongo localhost:2717
```
