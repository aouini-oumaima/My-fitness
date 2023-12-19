var express = require('express');
var router = express.Router();
const {addNewFollow,CurrentFollow ,ForeignFollow} =require("../controller/follow")

router.post("/addfollow",addNewFollow)
router.post("/current",CurrentFollow)
router.post("/foreign",ForeignFollow)

module.exports = router;