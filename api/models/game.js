const mongoose   = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    date: Date,
    winner: String || null,
    squares: [String]
}, { collection: 'games' });

GameSchema.plugin(timestamps);

module.exports = exports = mongoose.model('Game', GameSchema);
