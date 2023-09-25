const express = require('express');
const router = express.Router();
const cors = require('cors')
const user_controller = require("../../../controllers/userController");
const signUpValidations = require("../../../../middleware/fields_validation");



// Create a new User
router.get("/getallusers", user_controller.getCreateUserList);
router.post("/create", signUpValidations, user_controller.postCreateNewUser);


module.exports = router;
