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
docker-compose -f docker-compose.dev.yml up -d --build
```

## Prod

```
docker-compose -f docker-compose.prod.yml up -d --build
```

## Benchmarks

- Performed against the API which is running in a Docker container
- Using [K6](https://github.com/grafana/k6) for load testing
- Running on a machine with: ubuntu 21.04, 1gb ram, 1vcore

|              action              | requests/second |
| :------------------------------: | :-------------: |
|           healthcheck            |       998       |
|           create poll            |       91        |
|   retrieve poll (has 0 votes)    |       234       |
| retrieve poll (has 10,000 votes) |       270       |
|           vote on poll           |       88        |
