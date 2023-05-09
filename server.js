const express = require("express");

const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(5000, () => {
    console.log("app.js is running")
});

const portNumber = server.address().port;

console.log(`port is open on ${portNumber}`);

