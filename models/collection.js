var orm = require('../config/orm');

var collection = {
    addCard: function (cardJSON, userInfo, cb) {
        orm.addCard(cardJSON, userInfo, function (data) {
            cb(data);
        });
    },
    editValue: function (cardID, value, userInfo, cb) {
        orm.editValue(cardID, value, userInfo, function (data) {
            cb(data);
        });
    },
    deleteCard: function (cardID, userInfo, cb) {
        orm.deleteCard(cardID, userInfo, function (data) {
            cb(data);
        });
    }
};

module.exports = collection;