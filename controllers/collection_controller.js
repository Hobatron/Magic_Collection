var express = require('express')
var route = express.Router();

var user = require('../models/mtg_collection.js')

route.get('/', function (req, res) {
    res.render('index');
})

route.post('/createUser', function (req, res) {
    user.exist([req.body.username, '%createingNewUser%'], function (data) {
        if (data == null) {
            user.create([req.body.username, req.body.password], function (results) {
                if (results == 'Invalid password') {
                    res.json({
                        invalidPass: true
                    });
                } else {
                    res.json({
                        userCreated: true
                    });
                }
            });
        } else {
            res.json({
                userExists: true
            });
        };
    })
})

route.post('/', function (req, res) {
    userName = req.body.username;
    password = req.body.password
    user.exist([userName, password], function (data) {
        if (data == null) {
            res.render('index', {
                badUserPass: true
            })
        } else {
            user.loadDB(data[0].id, data[0].userName, function (results) {
                cards = {
                    cards: results
                };
                res.render('collection', cards);
            });
        };
    });
});



module.exports = route;