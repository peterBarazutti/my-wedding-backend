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
        .then((response) => {
            res.status(201).json({
                message: "Wedding saved to database!"
            });
        })

});

router.get("/:weddingName", ((req, res, next) => {
            Wedding.find({name: req.params.weddingName})
                .then((wedding) => {
                    res.status(200).json(wedding)
                })
        }
    )
);

router.delete("/", ((req, res, next) =>  {
    Wedding.deleteMany()
        .then((response)=> res.json({message: response}))
        .catch((err)=>res.status(500).json({error: err}))
}));


router.delete("/:weddingName", ((req, res, next) =>  {
    Wedding.deleteOne({name: req.params.weddingName})
        .then((response)=> res.json({message: response}))
        .catch((err)=>res.status(500).json({error: err}))
}));

module.exports = router;
