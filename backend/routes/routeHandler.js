const express = require('express');

const router = express.Router();

const presents = [
    {id: 1, name: "zsiráf", isTaken: false, owner: "none"},
    {id: 2, name: "löncshús", isTaken: true, owner: "none"},
    {id: 3, name: "egy új vese", isTaken: false, owner: "none"},
    {id: 4, name: "bontott tégla", isTaken: false, owner: "none"}
];

router.get('/presents', (req, res, next) => {
    res.status(200).json({
        message: "minden ok",
        data: presents
    })
});

module.exports = router;
