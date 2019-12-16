require('dotenv').config();
const express = require('express');

const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

/** IMPORT MIDDLEWARE(S) BELOW */
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/** IMPLEMENT DATABASE BELOW */
const db = require('./database/database.js');
db.connectDatabase();

/** IMPLEMENT YOUR ROUTER BELOW */
var gamesRouter = require('./routes/game.js');
app.use('/', gamesRouter);

/** RUN YOUR SERVER BELOW */
app.listen(port, () => console.log(`Ventana Backend Checkers App listening on port ${port}`));

module.exports = app;

