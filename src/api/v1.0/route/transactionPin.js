const express = require('express');
const router = express.Router();
const cors = require('cors');
const passport = require('passport');
require('../../../../config/passport')(passport);
const transactionPin_controller = require("../../../controllers/transactionPinController")
const createTransactionPinValidations = require("../../../../middleware/fields_validation");

router.post(
  "/create",
  createTransactionPinValidations,
  transactionPin_controller.createTransactionPin
);




module.exports = router;
