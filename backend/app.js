const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const eventRoutes = require('./routes/routeHandler');

/*UkWELb4KVPgZsfvm*/
const mongooseDBUrl = "mongodb+srv://Peter:UkWELb4KVPgZsfvm@meantestproject-khhow.mongodb.net/node-angular?retryWrites=true";

const mongooseOptions = {
    useNewUrlParser: true
};

const myApp = express();

/*mongoose.connect(mongooseDBUrl, mongooseOptions)
    .then(() => {
        console.log('Connected to database')
    })
    .catch(() => {
        console.log('Connection failed!')
    });*/

myApp.use(bodyParser.json());
myApp.use(bodyParser.urlencoded({extended: false}));

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

myApp.use('/api', eventRoutes);

module.exports = myApp;
