const express = require('express');
const router = express.Router();
const cors = require('cors');
const passport = require('passport');
require('../../../../config/passport')(passport);
const transactionPin_controller = require("../../../controllers/transactionPinController")


router.post('/create', transactionPin_controller.createTransactionPin);




module.exports = router;
