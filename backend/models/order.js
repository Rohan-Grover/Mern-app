const mongoose = require('mongoose');

let Order = new mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    review: {
        type: String,
    },
    item_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Order', Order);