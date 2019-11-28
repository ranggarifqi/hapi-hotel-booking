# Hapi Product Management

The project is created with this awesome tools, Hapi Pal (https://hapipal.com/getting-started)

## Description

- This is the source code for Product Management REST API Server
- Author : Rangga Rifqi Pratama (http://www.linkedin.com/in/ranggarifqi)
- License : -
- Framework : Hapi JS
- Datasource : PostgreSQL

## How to Install

1. Clone this repo
3. `cd hapi-product-management`
4. `npm i`
5. Create database manually on PosgreSQL. Name of your choice

## Environment Setup

Asumming that you're already inside the project `root` directory : 
1. Look at `.env-keep` file inside folder `server`.
2. Copy that file, and paste it as `.env`
3. Fill all the env configuration.

## Migration && Seeder Setup
Asumming that you're already inside `root` directory :
1. execute `npx knex migrate:latest`
2. you will see `Batch 1 run: 2 migrations` if it's successfully migrate the tables.

## Running the Server
Asumming that you're already inside `root` directory :

1. First Rule is, you have to run this first, before running the frontend (https://github.com/ranggarifqi/react-product-management)
2. `npm start`
3. You will see this notification : 
```
Server started at http://localhost:3000
```
4. If you found an error, try to use `sudo npm start` (for windows, run Git Bash / CMD / CMDER as Administrator, then try `npm start`)
5. To open API Explorer, goto `http://localhost:3000/documentation`
6. To use the API, use this URL `http://localhost:3000/[ROUTE]`

## First Things First
You have to create 1 user account first. I'm sorry i can't provide the seeder yet. Because of tight deadline.

You can use this route (http://localhost:3000/documentation#/users/postUsers)
