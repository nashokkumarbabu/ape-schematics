const express = require('express');
const app = express();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const compression = require('compression');
const path = require("path");
const server = require('http').Server(app);


app.use(helmet()); 
app.use(compression()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

require('./setup/config');
require('./setup/sessions')(app);
require('./setup/cookies')(app);
require('./setup/cors')(app);
require('./setup/logs')(app);
require('./setup/router')(app);
require('./setup/start')(server);