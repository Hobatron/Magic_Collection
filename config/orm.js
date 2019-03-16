var connection = require("../config/connection.js");
const userProfile = '(' +
    'id INT NOT NULL AUTO_INCREMENT,' +
    'cardName VARCHAR(255) NOT NULL,' +
    'qnt INT DEFAULT 1,' +
    'imgURL VARCHAR(255),' +
    'detailsURL VARCHAR(255) NOT NULL,' +
    'PRIMARY KEY (id)' +
    ');'


var user = {
    exist: function (sql, userLoginInput, cb) {
        connection.query(sql, userLoginInput, function (err, results) {
            if (err) throw err;
            if (results.length == 0) {
                results = null;
            };
            cb(results);
        });
    },
    create: function (userDetails, cb) {
        connection.query('INSERT INTO users SET ?', userDetails, function (err, results) {
            if (err) throw err;

            connection.query('CREATE TABLE ?? ' + userProfile, [results.insertId + userDetails.userName + '_cdb'], function (err, results) {
                if (err) throw err;
                cb(results);
            })
        })
    },
    getCollection: function (userCollection, cb) {
        var sql = 'SELECT * FROM ??';
        connection.query(sql, userCollection, function (err, results) {
            if (err) throw err;
            cb(results);
        })
    }
}


module.exports = user;