# Hapi Hotel Room Booking

The project is created with this awesome tools, Hapi Pal (https://hapipal.com/getting-started)

## Description

- This is the source code for Hotel Room Booking REST API Server
- Author : Rangga Rifqi Pratama (http://www.linkedin.com/in/ranggarifqi)
- License : -
- Framework : Hapi JS
- Datasource : MySQL

## How to Install

1. Clone this repo
3. `cd hapi-hotel-booking`
4. `npm i`
5. Create database manually on MySQL. Name of your choice

## Environment Setup

Asumming that you're already inside the project `root` directory : 
1. Look at `.env-keep` file inside folder `server`.
2. Copy that file, and paste it as `.env`
3. Fill all the env configuration. For Example :
```
NODE_ENV=development
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD=""
DB_DATABASE="hotel_booking"
JWT_SECRET="justv3ryl0ngS3cr3tK3y"
```

## Migration && Seeder Setup
Asumming that you're already inside `root` directory :
1. execute `npx knex migrate:latest`
2. you will see `Batch 1 run: x migrations` if it's successfully migrate the tables.
3. Seed the tables using `npx knex seed:run`.

## Running the Server
Asumming that you're already inside `root` directory :

1. `npm start`
2. You will see this notification : 
```
Server started at http://localhost:3000
```
3. If you found an error, try to use `sudo npm start` (for windows, run Git Bash / CMD / CMDER as Administrator, then try `npm start`)
4. To open API Explorer, goto `http://localhost:3000/documentation`
5. To use the API, use this URL `http://localhost:3000/[ROUTE]`

## Features
1. CRUD `RoomTypes` & `Rooms` :white_check_mark:
2. API to display all available room given date range (Check In & Checkout) :white_check_mark:
3. API to book multiple room given date range (Check in & Check out) :white_check_mark:
4. API to cancel booking :white_check_mark:
5. API to Create User by Role :white_check_mark:
6. API to Login User :white_check_mark:
7. JWT Authentication :white_check_mark:
8. Support Record of Change for the rooms (Audit trail)
9. Queue integrated system
10. API to Update Booking only allowed before check in date :white_check_mark:
11. Access Control List
12. Swagger Documentation :white_check_mark:
13. Authentication Feature for Swagger
