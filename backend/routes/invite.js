const express = require('express');
const router = express.Router();
const email = require('../controllers/invite');

router.post("/:weddingName", email.invite);

module.exports = router;
