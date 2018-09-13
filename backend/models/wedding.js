const mongoose = require('mongoose');

const weddingScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    },
    guestList: {
        type: [String],
        default: []
    },
    markers: {
        type: [Object],
        default: []
    },
    guests: {
        type: [Object],
        default: []
    },
});

module.exports = mongoose.model('Wedding', weddingScheme);