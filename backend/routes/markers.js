const express = require('express');
const router = express.Router();
const Wedding = require('../models/wedding');
const User = require('../models/user');
const mongoose = require('mongoose');


router.post("/:weddingName", (req, res, next) => {
    Wedding.update({name: req.params.weddingName},
        {
            $push: {
                markers: {
                    "name": req.body.name,
                    "lat": req.body.lat,
                    "lng": req.body.lng
                }
            }
        })
        .then((resp) => {
                res.status(201).json({
                    message: "Marker added to Wedding name: " + req.params.weddingName
                })
            }
        );
});


router.get("/:weddingName", (req, res, next) => {
        Wedding.find({name: req.params.weddingName})
            .select('markers')
            .then((response) => res.status(200).json({
                    message: "Operation successful.",
                    markers: response[0]["markers"]
                })
            )
            .catch(err=>res.status(500).json({err: err.message}))
    }
);

router.patch("/:weddingName", (req, res, next) => {
    Wedding.update({"name": req.params.weddingName, "markers._id": req.body._id},
        {
            $set: {
                "markers.$.lat": req.body.lat,
                "markers.$.lng": req.body.lng,
                "markers.$.name": req.body.name,
                "markers.$.icon": req.body.icon
            }
        }
    )
        .then((response) => res.json({resp: response}))


});



router.delete("/:weddingName/:markerId", (req, res, next) => {
    Wedding.update({"name": req.params.weddingName},
        {$pull: {"markers": {_id: req.params.markerId}}},
        {sale: true},
    )
        .then((response) => res.json({resp: response}))
});

module.exports = router;
