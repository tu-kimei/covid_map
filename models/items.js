const mongoose = require('mongoose');

const items = mongoose.Schema({
    pices: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "item_list"
        },
        quantity:{
            type: Number
        }
    }],
    
}, {
    timestamps: true
});

items.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = mongoose.model('items', items);