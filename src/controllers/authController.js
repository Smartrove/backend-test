const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../../config/passport')(passport);
const User = require('../../models').User;
const Response = require('../utils/response');
const response = new Response();
const bcrypt = require("bcryptjs");

const nodemailer = require('nodemailer');
require("dotenv").config();

const BaseFunction = require('../utils/baseFunction');
const baseFunction = new BaseFunction();



//Login as a user
exports.login = async (req, res) => {
  const { email, password } = req.body;
console.log("email", email)
console.log("password", password)
    if (!req.body.email || !req.body.password) {
        var message = 'Please enter email and password!';
        res.status(400).send(response.responseError([], false, "Unable to login!", message, 400))
    } else {
        var currentUser = await User.findOne({
            where: {
                email: email
            },
            attributes: ['id', 'email', 'username', 'fullname','dob']
        });
        console.log("my current user", currentUser.dataValues);
        if (!currentUser) {
            res.status(400).send(response.responseError([], false, "Invalid email address", "Please enter a valid/correct email address!", 400));
        } else {

            currentUser.comparePassword(password, async (err, isMatch) => {
                console.log('error', err);
                console.log('compared password', isMatch)
                const maxAge = 1;
                if (isMatch && !err) {
                    var token = jwt.sign(JSON.parse(JSON.stringify(currentUser)), process.env.LOGIN_SECRET_TOKEN_VALUE, {
                        expiresIn: process.env.LOGIN_SESSION_TIME //parseInt(process.env.LOGIN_SESSION_TIME)
                    });
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
                    jwt.verify(token, process.env.LOGIN_SECRET_TOKEN_VALUE, function (err, data) {
                        // console.log(err, data);
                    });
                    var data = {
                        'token': 'JWT ' + token,
                        'user': currentUser
                    }
                    //Retrieve the last login time from the user object or from your database.
                    const lastLogin = currentUser.last_login;
                    // console.log('my last login', lastLogin);
                    // update last_login and current_login field
                    await User.update({ last_login: new Date().toDateString(), current_login: lastLogin }, { where: { id: currentUser.id } })
                    res.status(200).send(response.responseSuccess(data, true, "Login was successful.", "Login was successful.", 200));
                } else {
                    res.status(400).send(response.responseError([], false, "Sorry! wrong password", "Invalid password, if you cannot remember your password, please click on forget password", 400));
                }
            })
        }
    }
};
