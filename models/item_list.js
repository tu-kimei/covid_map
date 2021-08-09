const mongoose = require('mongoose');

const item_list = mongoose.Schema({
    name: String,
    unit: String,
    type: String
}, {
    timestamps: true
});


module.exports = mongoose.model('item_list', item_list);