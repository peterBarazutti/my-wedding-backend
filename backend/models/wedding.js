const mongoose = require('mongoose');


const weddingScheme = mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        adminEmail: {
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
        }
    })
;

module.exports = mongoose.model('Wedding', weddingScheme);