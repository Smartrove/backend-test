const express = require('express');
const User = require('../../models').User;
const passport = require('passport');
require('../../config/passport')(passport);
const Helper = require('../utils/helper');
const helper = new Helper();
const Response = require('../utils/response');
const response = new Response();
const BaseFunction = require('../utils/baseFunction');
const baseFunction = new BaseFunction();
const env = require('dotenv').config();
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const Path = require("path");
const Moment = require('moment');





//POST: Create New User
exports.postCreateNewUser = async (req, res) => {
    if (!req.body.username || !req.body.fullname || !req.body.email || !req.body.dob || !req.body.password) {
        var message = 'Please enter your fullname, username, and email.';
        res.status(400).send(response.responseError([], false, "Unable to create user!", message, 400))
    } else {
        //Create User
        var currentUser = await User.findOne({
            where: {
                email: req.body.email
            },
        });
        // console.log(1111111, currentUser);

        if (currentUser) {
            res.status(400).send(response.responseError([], false, "Email already taken by another user.", "Email already exist.", 400));
        } else {
            User.create({
                email: req.body.email,
                password: process.env.STAFF_DEFAULT_PASSWORD,
                fullname: req.body.fullname,
                username: req.body.username,
                dob: req.body.dob,
            }).then((new_user) => {
                res.status(200).send(response.responseSuccess(new_user, true, "New user was created successfully.", "New user were create successfully.", 200));
            }).catch((error) => {
                console.log(error.message);
                res.status(400).send(response.responseError(error.message, false, "Sorry! create user unsuccessfully!", "Sorry! create user unsuccessfully!", 400));
            });
        }
    }
};

exports.getCreateUserList = async (req, res) => {
    User.findAll({
        order: [['createdAt', 'DESC']],
    }).then((users) => {
        console.log(users);
        res.status(200).send(response.responseSuccess(users, true, "User retrieve successfully!", 200));
    }).catch((error) => {
        console.log(error.message);
        res.status(400).send(response.responseError(error.message, false, "Sorry! user retrieve unsuccessfully!", "Sorry! user retrieve unsuccessfully!", 400));
    });
};



