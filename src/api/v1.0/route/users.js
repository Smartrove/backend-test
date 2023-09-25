const express = require('express');
const router = express.Router();
const cors = require('cors')
const user_controller = require("../../../controllers/userController");



// Create a new User
router.get("/getallusers", user_controller.getCreateUserList);
router.post('/create', user_controller.postCreateNewUser);


module.exports = router;
