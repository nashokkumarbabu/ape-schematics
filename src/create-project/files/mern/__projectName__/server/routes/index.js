const express = require("express");
const app = express();
const Routing = require("json-routing");

app.get("/", (req, res) => res.send("API /"));
let routeInfo = new Routing.JsonRoute(app, {
    "routesPath": "../routes/routes-json",
    "jwt": {
        "secret": "ENTER YOUR JWT SECRET KEY"
    },
    //"urlPrefix":"/v1",
    "processdir": __dirname
}).start();


module.exports = app;
