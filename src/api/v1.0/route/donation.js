const express = require('express');
const router = express.Router();
const cors = require('cors');
const passport = require('passport');
require('../../../../config/passport')(passport);
const donation_controller = require("../../../controllers/donationController")


router.post('/create', donation_controller.donate);
router.get("/getallusersdonation", donation_controller.getUserDonations);
router.get(
  "/getsingleuserdonations/:user_id",
  donation_controller.getSingleUserDonations
);
router.get(
  "/getuserdonationcounts/:user_id",
  donation_controller.getUserDonationCount
);
router.post(
  "/getsingledonationtouser/:user_id",
  donation_controller.getSingleDonationToUser
);




module.exports = router;
