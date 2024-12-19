## Description

Trello_clone app is deleveloped by Mr.Hoang

## Project setup

```bash
$ npm install
```

## Migrate database
### generate migration
```bash
$ npm run typeorm:migration:generate src/migrations/name
```
### run migration
run app to build dist again :
```bash
$ npm run start:dev
```
run script :
```bash
$ npm run typeorm:migration:run
```
## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
