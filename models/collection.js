var orm = require('../config/orm');

var collection = {
    addCard: function (cardJSON, cb) {
        orm.addCard(cardJSON, function (data) {
            cb(data)
        })
    }
}

module.exports = collection;