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
            type: [{
                name: String,
                email: String,
                rsvp: String,
                guests: Number
            }],
            default: []
        },
        markers: {
            type: [{
                name: String,
                lat: Number,
                lng: Number,
                icon: String
            }],
            default: []

        },
        messages: {
            type: [{
                timestamp: Date,
                message: String,
                name: String
            }],
            default: []
        }
    })
;

module.exports = mongoose.model('Wedding', weddingScheme);