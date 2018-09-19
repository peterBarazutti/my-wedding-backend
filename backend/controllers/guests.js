const mongoose = require('mongoose');
const User = require('../models/user');
const Wedding = require('../models/wedding');



exports.addGuest = (req, res, next) => {
    Wedding.update({name: req.params.weddingName},
        {
            $push: {
                guestList: {
                    "name": req.body.name,
                    "email": req.body.email,
                    "guests": req.body.guests
                }
            }
        }
    )
        .then(() => {
            console.log("guest added.");
            next()})
};


exports.updateGuest = (req, res, next) => {
    Wedding.update({"name": req.params.weddingName, "guests._id": req.body._id},
        {
            $set: {
                "guestList.$.name": req.body.name,
                "guestList.$.email": req.body.email,
                "guestList.$.rsvp": req.body.rsvp,
                "guestList.$.guests": req.body.guests
            }
        }
    )
        .then((response) => res.json({resp: "Guest updated"}))
        .catch(err => res.status(500).json({err: err.message}))

}

exports.getGuests = (req, res, next) => {
    Wedding.find({name: req.params.weddingName})
        .select('markers')
        .then((response) => res.status(200).json({
                message: "Operation successful.",
                markers: response[0]["guestList"]
            })
        )
        .catch(err => res.status(500).json({err: err.message}))
}