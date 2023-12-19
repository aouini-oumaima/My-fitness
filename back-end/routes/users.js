var express = require('express');
var router = express.Router();
const {getAllUsers,addNewUser, getUser,updatePro, deletePro} = require("../controller/users")

/* GET users listing. */
router.get('/', getAllUsers);
router.put("/update/:id",updatePro)
router.post("/signup",addNewUser)
router.get("/login/:id",getUser)
router.delete("/delete/:id",deletePro)

module.exports = router;
