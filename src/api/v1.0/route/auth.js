const express = require('express');
const router = express.Router();
const cors  = require('cors');
const passport = require('passport');
require('../../../../config/passport')(passport);
const auth_controller = require("../../../controllers/authController")


router.post('/login',  auth_controller.login);




module.exports = router;
