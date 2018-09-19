const express = require('express');
const User = require('../models/user');
const router = express.Router();
const mongoose = require('mongoose');


router.post("", (req, res, next) => {
    User.find({email: req.body.email})
        .then(
            (resp) => {
                if (resp.length === 0) {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId,
                        email: req.body.email
                    });
                    user.save()
                        .then((createdUser) => {
                            console.log(createdUser);
                            res.status(201).json(createdUser);
                        });
                } else {
                    res.status(200).json(resp[0])
                }
            }
        );
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
