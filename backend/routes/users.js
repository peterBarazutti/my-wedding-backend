const express = require('express');
const User = require('../models/user');
const router = express.Router();
const mongoose = require('mongoose');


router.post("", (req, res, next) => {
    const present = new User({
        _id: new mongoose.Types.ObjectId,
        email: req.body.email
    });
    present.save()
        .then((createdUser) => {
            console.log(createdUser);
            res.status(201).json({
                message: "User saved to database!",
                userId: createdUser._id
            });
        });
});

router.get("/:id", (req, res, next) => {
    User.findById(req.params.id)
        .then((result) => res.status(200).json({
            user: result
        }))
        .catch((err) => res.status(500).json({error: err.message}))
});

// router.post("/:id", ((req, res, next) => {
//     let userToPatch;
//     User.findById(req.params.id)
//         .then((result) => {
//                 userToPatch = result;
//                 userToPatch.guestList.push(result)
//             }
//         )
//
// }
module.exports = router;
