var express = require('express');
var router = express.Router();
const {addNewFollow,CurrentFollow ,ForeignFollow} =require("../controller/follows")

router.post("/addfollow",addNewFollow)
router.get("/current",CurrentFollow)
router.get("/foreign",ForeignFollow)

module.exports = router;