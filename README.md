# asking.one [![build](https://github.com/jdleo/asking/actions/workflows/build.yml/badge.svg)](https://github.com/jdleo/asking/actions/workflows/build.yml) [![test](https://github.com/jdleo/asking/actions/workflows/test.yml/badge.svg)](https://github.com/jdleo/asking/actions/workflows/test.yml)

Very lightweight service to create/vote on polls.

## Stack

- React
- Express
- PostgreSQL
- Docker
- Docker Compose
- Github Actions

## Dev

```
docker-compose -f docker-compose.dev.yml up -d --build;
```

## Prod

```
docker-compose -f docker-compose.prod.yml up -d --build;
```

## Benchmarks

Performed against API, locally while running in Docker stack. Benchmarks performed using k6.
Keep in mind, this is a single express service, and a single postgres service. To scale this further, convert docker-compose to a Kubernetes stack, and have express/postgres autoscaled.

```
healthcheck - 347.043365 req/s
create poll - 66.305728 req/s
retrieve poll (w/ no votes) - 137.023795 req/s
retrieve poll (w/ 5000 votes) - 100.389343 req/s
vote on poll - 64.010983 req/s
```
