var express = require('express');
var router = express.Router();
const {newConversation,newLatest, getAllConversations}=require("../controller/allConversatios")


router.post("/start",newConversation)
router.post("/latest",newLatest)
router.get("/getAll/:uid",getAllConversations)
module.exports = router