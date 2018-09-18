const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const presentRoutes = require('./routes/presents');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const weddingRoutes = require('./routes/weddings');
const userRoutes = require('./routes/users');
const markerRoutes = require('./routes/markers');
const guestRoutes = require('./routes/guests');
const myApp = express();



myApp.use(bodyParser.json());
myApp.use(bodyParser.urlencoded({extended: true}));
myApp.use(cors());


const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://my-wedding-test.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://localhost:3000',
    issuer: "https://my-wedding-test.eu.auth0.com/",
    algorithms: ['RS256']
});

// myApp.use(jwtCheck);

/*UkWELb4KVPgZsfvm*/
const mongooseDBUrl = "mongodb+srv://Peter:UkWELb4KVPgZsfvm@my-wedding-cluster-ybdzh.mongodb.net/test";

const mongooseOptions = {
    useNewUrlParser: true
};

mongoose.connect(mongooseDBUrl, mongooseOptions)
    .then(() => {
        console.log('Connected to database')
    })
    .catch(() => {
        console.log('Connection failed!')
    });



myApp.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, If-None-Match");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.set(
        "Access-Control-Allow-Credentials", "true"
    );
    next();
});

myApp.use('/api/presents', presentRoutes);
myApp.use('/api/weddings', weddingRoutes);
myApp.use('/api/users', userRoutes);
myApp.use('/api/markers', markerRoutes);
myApp.use('/api/guests', guestRoutes);




module.exports = myApp;
