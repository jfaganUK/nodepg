#!/usr/bin/env nodejs
/**
 * Created by jfagan on 12/11/14.
 */

// Module dependencies

var appRoot     = __dirname,
    express     = require('express'), //The web framework
    bodyParser  = require('body-parser'),
    path        = require('path'),
    Sequelize   = require('sequelize'),
    pg          = require('pg'),
    randomWords = require('random-words');

console.log("==== Node and Postgres experimenting ====");

var sequelize = new Sequelize('nodepg', 'postgres', 'postgres', {
        dialect: 'postgres'
    });

sequelize
    .authenticate()
    .complete(function(err) {
        if(!!err) {
            console.log("Unable to connect to the database:",err);
        } else {
            console.log("Connection has been established successfully.");
        }
    });

var User = sequelize.define('User', {
    name: Sequelize.STRING,
    email: Sequelize.STRING
}, {
    tableName: 'users',
    timestamps: false
});

User.create({
    name: randomWords() + ' ' + randomWords(),
    email: randomWords() + '@uky.edu'
})
    .complete(function(err, user) {
        if(!!err) {
            console.log('The instance has not been saved', err);
        } else {
            console.log('We have a persisted instance now');
        }
    });

User.find({where: {name: 'Jesse Fagan' }})
.complete(function(err, user) {
        if(!!err) {
            console.log('An error occurred while searching for Jesse Fagan:',err);
        } else if (!user) {
            console.log('No user with the user name ')
        } else {
            console.log('Hello ' + user.name + '!');
            console.log('All attributes of Jesse:', user.values);
        }
    });





