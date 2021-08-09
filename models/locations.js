const mongoose = require('mongoose');

const locationsSchema = mongoose.Schema({
    id: String,
    location: String,
    name: String,
    latitude: Number,
    longitude: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Locations', locationsSchema);