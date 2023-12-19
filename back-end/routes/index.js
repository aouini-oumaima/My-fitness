var express = require('express');
var router = express.Router();
var user = require("../controller/test")
var {getUser, updateUser}=require("../controller/getupdateUser")



router.put('/',updateUser)


router.put('/',updateUser)



router.get('/user/:id',getUser);
router.put('/user/update/:id',updateUser);






module.exports = router;