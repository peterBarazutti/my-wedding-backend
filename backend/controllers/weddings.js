const Wedding = require('../models/wedding');
const User = require('../models/user');
const mongoose = require('mongoose');

exports.postWedding = ((req, res, next) => {
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

exports.getOneWedding = ((req, res, next) => {
        Wedding.find({name: req.params.weddingName})
            .then((wedding) => {
                res.status(200).json(wedding)
            })
    }
);

exports.deleteAll = ((req, res, next) => {
    Wedding.deleteMany()
        .then((response) => res.json({message: response}))
        .catch((err) => res.status(500).json({error: err}))
});

exports.deleteOne = ((req, res, next) => {
    Wedding.deleteOne({name: req.params.weddingName})
        .then((response) => res.json({message: response}))
        .catch((err) => res.status(500).json({error: err}))
});

exports.getAll = ((req, res, next) => {
    Wedding.find()
        .then((result) => {
                res.status(200).json(result)
            }
        )
});

exports.addMessageToWedding = function (weddingName, senderName, content) {
    Wedding.update({name: weddingName},
        {
            $push: {
                messages: {
                    "name": senderName,
                    "timestamp": Date.now(),
                    "message": content
                }
            }
        })
        .then((resp) => {
                console.log(resp)
            }
        )
        .catch((err) => console.log({error: err}));
};
