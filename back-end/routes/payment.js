const express = require('express');
const router = express.Router();
const {payement, subscription} = require("../controller/payment")

// router endpoints
router.post('/intents',payement);
router.put('/subscription',subscription);

module.exports = router;