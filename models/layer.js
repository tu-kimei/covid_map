const mongoose = require('mongoose');
// Mongoose Schema definition
var Schema = mongoose.Schema;
var layer = new Schema({
    type: String,
    name: String,
    color: String,
    style: Schema.Types.Mixed,
    coodinates: Schema.Types.Mixed,
    features: Schema.Types.Mixed
});

module.exports = mongoose.model('layer', layer)