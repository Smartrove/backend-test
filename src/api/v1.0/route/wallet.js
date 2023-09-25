const express = require('express');
const router = express.Router();
const cors = require('cors');
const passport = require('passport');
require('../../../../config/passport')(passport);
const wallet_controller = require("../../../controllers/walletController")


router.post('/create',  wallet_controller.createWallet);
router.get("/getbalance/:user_id", wallet_controller.getBalance);




module.exports = router;
