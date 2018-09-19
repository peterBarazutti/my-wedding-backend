const express = require('express');
const router = express.Router();
const email = require('../controllers/invite');
const userController = require("../controllers/users");
const guestController = require("../controllers/guests");

router.post("/:weddingName", email.invite, guestController.addGuest ,userController.addUser);

module.exports = router;
