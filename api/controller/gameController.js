const Game = require('../models/game.js');
const mongoose = require('mongoose');

exports.getGameHistory = async (req, res, next) => {
    res.send(JSON.stringify(await gameHistory()));
}
exports.postGame = async (req, res, next) => {
    let response = await createGame({
        squares: req.body.squares, 
        winner: req.body.winner,
        date: new Date()
    });

    if(response && response.hasOwnProperty('error')) {
        return res.send(JSON.stringify(response));
    }

    return res.send(JSON.stringify(await gameHistory()));
}
exports.getGameAnalysis = async (req, res, next) => {
    res.send(JSON.stringify(await gameAnalysis()));
}

// Get all games, sort by date
gameHistory = async () => {
    let response = await Game.find({}).sort('-date').exec();

    if(!response) {
        return [];
    }
    
    return response;
}

// Create a game
createGame = async (payload) => {
    const { squares, winner } = payload;

    let game, response; 

    game = new Game({
        _id: new mongoose.Types.ObjectId(),
        squares: squares,
        winner: winner,
        date: new Date
    });

    response = await game.save();

    if(!response) {
        return {};
    }

    return response;
}

// Shows the rates of winning percentage, O and X 
gameAnalysis = async () => {
    let response = await Game.aggregate(
        [
            { 
                $group: {    
                    _id: null,    
                    X: { $sum: { $cond :  [{ $eq : ['$winner', "X"]}, 1, 0]} },
                    O: { $sum: { $cond :  [{ $eq : ['$winner', "O"]}, 1, 0]} },
                    Total: { $sum: 1 }
                } 
            }, 
            {
                $project: {
                    x: { $divide: [ "$X", "$Total" ]},
                    o: { $divide: [ "$O", "$Total" ]}
                }
            },
        ]
    ).exec();

    return response ? response[0] : {};
}

