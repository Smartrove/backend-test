const express = require('express');
const router = express.Router();
const cors  = require('cors');
const passport = require('passport');
require('../../../../config/passport')(passport);
const auth_controller = require("../../../controllers/authController")
const loginValidation = require("../../../../middleware/fields_validation");

router.post("/login", loginValidation, auth_controller.login);
router.post("/forgotpassword", auth_controller.forgetPassword);
router.post("/resetpassword", auth_controller.resetPassword);




module.exports = router;
