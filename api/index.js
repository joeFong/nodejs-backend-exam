require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors')
var bodyParser = require('body-parser');
const app = express();
const port = 4000;

/** IMPORT MIDDLEWARE(S) BELOW */
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
/** IMPLEMENT MIDDLEWARE(S) BELOW */

/** IMPLEMENT DATABASE BELOW */
const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/** IMPLEMENT YOUR ROUTER BELOW */
var gamesRouter = require('./routes/game.js');
app.use('/', gamesRouter);

/** RUN YOUR SERVER BELOW */
app.listen(port, () => console.log(`Ventana Backend Checkers App listening on port ${port}`))
