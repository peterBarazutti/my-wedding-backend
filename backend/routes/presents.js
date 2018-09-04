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
    res.status(200).json({
        message: "minden ok",
        data: presents
    })
});



module.exports = router;
