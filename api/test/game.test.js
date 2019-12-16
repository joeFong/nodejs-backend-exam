require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index.js')

const postGameData = { 
    squares: ["X", "O", null, "X", "O", null, "X", null, null],
    winner: "X",
    date: new Date()
};

describe('GET /game', () => {
  test('This will get the all game history sorted by date', async () => {
    const response = await request(app).get('/game');
    expect(response.status).toBe(200);
  });
});

describe('GET /game-analysis', () => {
    test('This will return winrate of X\'x and O\'s', async () => {
        const response = await request(app).get('/game');
        expect(response.status).toBe(200);
    });
});

describe('POST /game', () => {
    test('This will create a game', async () => {
        const response = await request(app).post('/game')
        .send(postGameData)
        .set('Accept', 'application/json');
        expect(response.status).toBe(200);
    });
});