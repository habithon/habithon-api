# Habithon Server

## Installation & Usage

### Installation

- Clone or download the repo.
- Open terminal and navigate to `api` folder.
- Run `npm install` to install dependencies and devDependencies.

### Usage
`root_dir = https://habithon-server.herokuapp.com/`
|Request|Root|request|response|
|---|---|---|---|
|POST|/user/login|`{"username":[username], "password":[password]}|`token: Barer [token]`|
|POST|/user/register|`{"username":[username], "password":[password], "fullName":[full name], "email": [email]|`token: Barer [token]`|
|GET| /goals/ |send token as `Authorization` header| an array of objects of structure: `{“id”: 1, “user_id”: 1, “habit”: “sleep”,“streak”: 10,“frequency”: “daily”, “last_completed”: “2022-08-15T00:00:00.000Z”}`|
|GET| /goals/:id |send token as `Authorization` header| an object of structure: `{“id”: 1, “user_id”: 1, “habit”: “sleep”,“streak”: 10,“frequency”: “daily”, “last_completed”: “2022-08-15T00:00:00.000Z”}`|
|DELETE| /goals/:id |send token as `Authorization` header| returns status 204 upon successful deletion|
|POST| /goals |send token as `Authorization` header and object: `{"habit": [habit], "frequency": [string: "daily", "weekly", "monthly"]}| returns created object|
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
