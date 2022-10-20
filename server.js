const cTable = require('console.table');
const inquirer = require('inquirer');
const mySQL = require('mysql2');
require('dotenv').config();

const db = mySQL.createConnection(
    {
        database: process.env.DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD

    },
    console.log(`Connected to ${DB_NAME}`)
);



