var express = require('express');
var router = express.Router();
const cors = require('cors');
const passport = require('passport');
require('../../../config/passport')(passport);// Require controller modules.

const index_controller = require("../../controllers/indexController");
var usersRouter = require('./route/users');
var authRouter = require('./route/auth');
var walletRouter = require('./route/wallet')
var donationRouter = require('./route/donation')
var transactionPinRouter = require('./route/transactionPin')
const auth = require("../../../middleware/auth_user");




if (process.env.NODE_ENV == "test") { //for UNIT TESTING

} else {
    router.get('/', index_controller.index);
    router.use('/auth', cors(), authRouter);
    // router.use('/user', cors(), auth, passport.authenticate('jwt', { session: false }), usersRouter);
    router.use('/user', 
    cors(), 
    // auth, 
    // passport.authenticate('jwt', { session: false }), 
    usersRouter);
    router.use('/wallet', 
    // auth, 
    cors(), walletRouter)
    router.use('/donation',
    //  auth, 
     cors(), donationRouter)
    router.use('/transactionPin', 
    // auth, 
    cors(), transactionPinRouter)
}

module.exports = router;
