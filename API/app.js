require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plau');
    res.end('Hello World');

    exports.myDateTime = function () {
        return Date();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});