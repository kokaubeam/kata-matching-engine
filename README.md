# Kata: Matching Engine

Basic matching engine to execute buys and sells for the best available price.

## How to Run

### Docker Compose

```
docker-compose up
```

### Docker

```
docker build -t kata-matching-engine build .
docker run -p 3000:3000 kata-matching-engine
```

### Node

```
npm install
npm start
```

## Setup a Development Environment

- Install [Git](https://git-scm.com/)
- Install [Docker](https://www.docker.com/community-edition#/download)

```
git clone git@github.com:kokaubeam/kata-matching-engine.git
cd kata-matching-engine

docker-compose -f docker-compose.dev.yml up
```

### Testing

```
docker-compose -f docker-compose.dev.yml run api npm run test
```

To run tests continually, append `-- --watch`:

```
docker-compose -f docker-compose.dev.yml run api npm run test -- --watchAll
```

To run end to end tests:

```
docker-compose -f docker-compose.dev.yml run api npm run e2e
```
