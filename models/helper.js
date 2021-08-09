const mongoose = require('mongoose');

const helper = mongoose.Schema({
    typeOf: {
        type: String,
        enum: ['helper','receiver'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    items: [
    {
        id: String,
        name: String,
        quantity: Number,
        unit: String
        
    }
    ],
    availableTo: {
        type: Date,
        required: [true, "'Available to' is Required"]
    }
}, {
    timestamps: true
});

helper.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = mongoose.model('hepler', helper);