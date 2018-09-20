const express = require('express');
const router = express.Router();

const weddingController = require('../controllers/weddings');


router.post("/:email", weddingController.postWedding);
router.get("/:weddingName", weddingController.getOneWedding);
router.delete("/", weddingController.deleteAll);
router.delete("/:weddingName", weddingController.deleteOne);
router.get("", weddingController.getAll);

module.exports = router;
