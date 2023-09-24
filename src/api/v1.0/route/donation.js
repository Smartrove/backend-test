const express = require('express');
const router = express.Router();
const cors = require('cors');
const passport = require('passport');
require('../../../../config/passport')(passport);
const donation_controller = require("../../../controllers/donationController")


router.post('/create', donation_controller.donate);
router.get('/getusersdonation', donation_controller.getUserDonations);
router.get('/getsingleuserdonations/:id', donation_controller.getUserDonations);




module.exports = router;
