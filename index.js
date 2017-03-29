'use strict';


const bodyParser = require('body-parser');
const config = require('config');
const redis = require('redis');
const express = require('express');
const http = require('http');
const request = require('request');

const redisClient = redis.createClient({host : 'localhost', port : 6379});

var app = express();
var router = express.Router();

app.set('port', process.env.PORT || 5555);
app.use(bodyParser.json());

redisClient.on('ready',function() {
    console.log("Redis is ready");
});

redisClient.on('error',function() {
    console.log("Error in Redis");
});

redisClient.set("test","blabla");


router.get('/test/webhook', function(req, res) {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === config.get('test.clientAccessToken')) {
        console.log("Validating webhook");
        redisClient.set("test","GOOD");
        res.status(200).send(req.query['hub.challenge'] + '/' + config.get('test.serverResponse'));

    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
});

router.get('/ac-fr/webhook', function(req, res) {
        res.status(200).send('AC_FR BOT');

});

router.get('/pokemongo/webhook', function(req, res) {
    res.status(200).send('POKEMON BOT');

});


app.use('/',router);

app.listen(app.get('port'), function() {
    console.log('Bot is running on port ', app.get('port'));
});