var express = require('express');
var router = express.Router();
const {addSearch ,deleteSearch ,getAllSearches ,getSearch} =require("../controller/search")

router.post("/addsearch",addSearch)
router.delete('/delete/:id',deleteSearch)
router.get('/getall',getAllSearches)
router.get('/get/:id',getSearch)
module.exports = router;