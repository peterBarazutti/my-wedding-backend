const express = require('express');
const router = express.Router();
const Wedding = require('../models/wedding');


router.post("/:weddingName", (req, res, next) => {
    Wedding.update({name: req.params.weddingName},
        {
            $push: {
                guestList: {
                    "name": req.body.name,
                    "email": req.body.email,
                    "guests": req.body.guests
                }
            }
        })
        .then((resp) => {
                // add user object if doesnt exsist todo
            }
        );
});


router.get("/:weddingName", (req, res, next) => {
        Wedding.find({name: req.params.weddingName})
            .select('markers')
            .then((response) => res.status(200).json({
                    message: "Operation successful.",
                    markers: response[0]["guestList"]
                })
            )
            .catch(err=>res.status(500).json({err: err.message}))
    }
);

router.patch("/:weddingName", (req, res, next) => {
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
        .catch(err=>res.status(500).json({err: err.message}))

});



router.delete("/:weddingName/:guestId", (req, res, next) => {
    Wedding.update({"name": req.params.weddingName},
        {$pull: {"guestList": {_id: req.params.guestId}}},
        {sale: true},
    )
        .then((response) => res.json({resp: response}))
        .catch(err=>res.status(500).json({err: err.message}))
});

module.exports = router;
