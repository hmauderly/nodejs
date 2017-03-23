'use strict';


const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const http = require('http');
const request = require('request');



var app = express();
var router = express.Router();

app.set('port', process.env.PORT || 5555);
app.use(bodyParser.json());


router.get('/webhook', function(req, res) {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === config.get('test.clientAccessToken')) {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
});

app.use('/',router);

app.listen(app.get('port'), function() {
    console.log('Bot is running on port ', app.get('port'));
});