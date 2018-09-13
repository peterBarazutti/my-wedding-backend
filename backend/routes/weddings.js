const express = require('express');
const router = express.Router();
const Wedding = require('../models/wedding');
const mongoose = require('mongoose');


router.post("", (req, res, next) => {
    const wedding = new Wedding({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        place: req.body.place,
        descr: req.body.descr
    });
    wedding.save()
        .then((createdWedding) => {
            res.status(201).json({
                message: "Wedding saved to database!",
                weddingId: wedding._id
            });
        })
        .catch(err=> res.status(500).json({error: err.message}));
});

router.get("", (req, res, next) => {
    res.status(200).json({
        message: "minden ok",
        data: presents
    })
});


module.exports = router;
