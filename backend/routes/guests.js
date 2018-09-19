const express = require('express');
const router = express.Router();
const Wedding = require('../models/wedding');
const guestController =require("../controllers/guests");


router.get("/:weddingName", guestController.getGuests);

router.patch("/:weddingName", guestController.updateGuest);


router.delete("/:weddingName/:guestId", (req, res, next) => {
    Wedding.update({"name": req.params.weddingName},
        {$pull: {"guestList": {_id: req.params.guestId}}},
        {sale: true},
    )
        .then((response) => res.json({resp: response}))
        .catch(err => res.status(500).json({err: err.message}))
});

module.exports = router;
