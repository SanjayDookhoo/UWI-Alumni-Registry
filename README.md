# UWI-Alumni Registry Web Application

## Pre-Req:

1. Ensure Nodejs is installed
2. Ensure mongoDB is installed

## Instructions

1. Install packages: `npm install`
2. Initiate mongoDB server by command `mongod`
3. Start the server: `node server.js`
4. Visit in browser at: `http://localhost:8080`
5. Graduate student website can be accessed by any email or password
6. Admin website can be accessed by email `a@a.com`

## Generating Mockup data

1. Initiate mongoDB server by command `mongod`
2. Enter directory /app/
3. Run command `curl "http://mockaroo.com/0572bcd0/download?count=1000&key=239fdb20" > "graduateStudent.json"`
4. Store data using Nodejs: `node graduateStudentStore.js`
