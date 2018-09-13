const express = require('express');
const router = express.Router();
const Wedding = require('../models/wedding');
const User = require('../models/user');
const mongoose = require('mongoose');


router.post("/:userid", (req, res, next) => {
    const wedding = new Wedding({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        place: req.body.place,
        descr: req.body.descr
    });
    wedding.save()
        .then((createdWedding) => {
            return User.update(
                {_id: req.params.userid},
                {$push: {myWeddings: createdWedding.name}},
            );
        })
        .then((response)=>{
            res.status(201).json({
                message: "Wedding saved to database!"
            });
        })

});



module.exports = router;
