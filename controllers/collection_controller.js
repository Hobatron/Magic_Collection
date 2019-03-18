var express = require('express')
var route = express.Router();

var user = require('../models/users.js');
var collection = require('../models/collection.js');


route.get('/', function (req, res) {
    res.render('index');
});
route.post('/api/addCard', function (req, res) {
    collection.addCard(req.body.cardJSON, function () {
        user.loadDB(req.body.userInfo[0], req.body.userInfo[1], function (results) {
            console.log(results)
            cards = {
                cards: results
            };
            res.render('collection', cards);
        });
    });
});

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
    });
});

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
                    cards: results,
                    user: [data[0].id, data[0].userName]
                };
                res.render('collection', cards);
            });
        };
    });
});



module.exports = route;