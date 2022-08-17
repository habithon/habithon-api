# Habithon Server

## Installation & Usage

### Installation

- Clone or download the repo.
- Open terminal and navigate to `api` folder.
- Run `npm install` to install dependencies and devDependencies.

### Usage

- Run `bash ./scripts/startDev.sh` to start server in the docker container.
- Run `bash ./scripts/startTest.sh` to launch test suite in the docker container.

## Changelog

### server.js

- [x] Created files in the MVC structure.
- [x] Created docker compose file and scripts.
- [x] Connected functions with the database.
- [x] Add middleware to verify tokens with hash.

## Bugs

- [] Create and run tests with in the compose file.

## Wins & Challenges

### Wins

- Managed to decode username with the respectively bearer token.
- Learned how to create database that returns the current date with the functions `NOW()` in PostgreSQL.

### Challenges

- Change the compose file to run tests in the docker container.

## Future Features
