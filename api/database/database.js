const mongoose = require('mongoose');

const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const dbConfig = { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
};

exports.connectDatabase = () => mongoose.connect(mongoDB, dbConfig);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
