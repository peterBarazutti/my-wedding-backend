
const mongoose = require('mongoose');
const User = require('../models/user');


exports.addUser = (req, res, next) => {
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
}