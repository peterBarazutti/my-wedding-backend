const express = require('express');
const Present = require('../models/present');
const router = express.Router();

const presents = [
    {id: 1, name: "zsiráf", isTaken: false, owner: "none"},
    {id: 2, name: "löncshús", isTaken: true, owner: "none"},
    {id: 3, name: "egy új vese", isTaken: false, owner: "none"},
    {id: 4, name: "bontott tégla", isTaken: true, owner: "none"}
];

router.post("", (req, res, next) => {
    const present = new Present({
        name: req.body.name,
        link: req.body.link
    });
    present.save()
        .then((createdPresent) => {
            console.log(createdPresent);
            res.status(201).json({
                message: "Present saved to database!",
                presentId: createdPresent._id
            });
        });
});

router.get("", (req, res, next) => {
    Present.find()
        .then(presentsList => {
            res.status(200).json({
                message: "Returning presents!",
                presents: presentsList
            });
        });
});

router.patch("/:id", (req, res, next) => {
    Present.findById(req.params.id, (err, present) => {
        present.isTaken = !present.isTaken;
        present.save();
    }).then(updatedPresent => {
        res.status(200).json({
            message: updatedPresent._id + " present's taken status updated",
        })
    })
});

router.delete("/:id", (req, res, next) => {
    Present.deleteOne({_id: req.params.id})
        .then(result => {
            console.log(result);
            res.status(200).json({ message: "Present deleted!"})
        });
});

router.put("/:id", (req, res, next) => {
    console.log(req.body);
    const present = new Present({
        _id: req.body.id,
        name: req.body.name,
        link: req.body.link,
        owner: req.body.owner,
        isTaken: req.body.isTaken
    });
    Present.updateOne({_id: req.params.id}, present).then(result => {
        console.log(result);
        res.status(200).json({ message: "Update successful!"});
        });
});


module.exports = router;
