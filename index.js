const http = require('http');
const express = require('express');

const app = require('./REST-API/express');

app.use(express.static('public'));

const server = http.createServer(app);

const port = 3000;

server.listen(port, () => {
    console.log(`Blockchain server running on port ${port}`);
});