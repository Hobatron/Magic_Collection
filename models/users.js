var orm = require('../config/orm');
var validation = require('password-validator');

var passwordSchema = new validation();


passwordSchema
    .is().min(5)
    .is().max(15)
    .has().uppercase()
    .has().digits()
    .has().not().spaces();

var user = {
    exist: function (userLoginInput, cb) {
        if (userLoginInput[1] == '%createingNewUser%') {
            sql = 'SELECT * FROM users WHERE userName = ?';
            userLoginInput = [userLoginInput[0]];
        } else {
            sql = 'SELECT * FROM users WHERE userName = ? AND password = ?'
        };
        orm.exist(sql, userLoginInput, function (results) {
            cb(results);
        })
    },
    create: function (userDetails, cb) {
        userDetails = {
            userName: userDetails[0],
            password: userDetails[1],
        };
        if (passwordSchema.validate(userDetails.password)) {
            orm.create(userDetails, function (results) {
                cb(results);
            });
        } else {
            cb('Invalid password');
        };
    },
    loadDB: function (usersID, userName, cb) {
        orm.getCollection(usersID + userName + '_cdb', function (results) {
            cb(results);
        });
    }
};

module.exports = user;