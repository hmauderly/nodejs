'use strict';



const redis = require('redis');



const redisClient = redis.createClient({host : 'localhost', port : 6379});



redisClient.on('ready',function() {
    console.log("Redis is ready");
});


redisClient.set("test","blabla");


console.log("END");

