const mongoose = require('mongoose');

let Item = new mongoose.Schema({
    vendor_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Item', Item);