var express = require('express');
var router = express.Router();
const {newMessage}=require('../controller/allConversatios')



router.post("/msg", newMessage);


module.exports = router