require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const log = console.log;
const bodyParser = require('body-parser');

const blog = require('./routes/blog');

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false")
    .then(() => {
        log(chalk.green("Connected to database!"));
    })
    .catch(() => {
        log(chalk.red("Connection failed!"));
    });

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.urlencoded({ extended: true}));

app.use(( req, res, next ) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use("", blog);

module.exports = app;