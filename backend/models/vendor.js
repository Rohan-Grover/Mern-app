const mongoose = require('mongoose');

let Vendor = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Vendor', Vendor);