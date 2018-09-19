const express = require('express');
const router = express.Router();
const Wedding = require('../models/wedding');



router.get("/:weddingName", (req, res, next) => {
        Wedding.find({name: req.params.weddingName})
            .select('messages')
            .then((response) => res.status(200).json({
                    message: "Operation successful.",
                    messages: response[0]["messages"]
                })
            )
            .catch(err=>res.status(500).json({err: err.message}))
    }
);


module.exports = router;
