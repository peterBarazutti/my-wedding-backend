const mongoose = require('mongoose');

const presentScheme = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: false
    },
    owner: {
        type: String,
        required: false,
        default: 'none'
    }
});

module.exports = mongoose.model('Present', presentScheme)