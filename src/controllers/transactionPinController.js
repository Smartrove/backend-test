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
const Transaction_Pin = require('../../models').Transaction_Pin;


// POST: Create Transaction Pin for a User
exports.createTransactionPin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Check if user_id and pin are provided in the request body
    if (!req.body.user_id || !req.body.pin) {
      const message = "Please provide both user_id and pin.";
      return res
        .status(400)
        .send(
          response.responseError(
            [],
            false,
            "Unable to create transaction pin!",
            message,
            400
          )
        );
    }

    // Check if the user with the given user_id exists
    const user = await User.findByPk(req.body.user_id);

    if (!user) {
      const message = "User not found.";
      return res
        .status(404)
        .send(
          response.responseError([], false, "User not found.", message, 404)
        );
    }

    // Validate the pin to ensure it is exactly four digits
    const pin = req.body.pin;
    if (!/^\d{4}$/.test(pin)) {
      const message = "Transaction PIN must be exactly four digits.";
      return res
        .status(400)
        .send(
          response.responseError([], false, "Invalid PIN format!", message, 400)
        );
    }

    const hashedPin = await bcrypt.hash(pin, 10);

    // Create the transaction PIN and associate it with the user
    const newTransactionPin = await Transaction_Pin.create({
      pin: hashedPin,
    });

    return res
      .status(200)
      .send(
        response.responseSuccess(
          newTransactionPin,
          true,
          "Transaction PIN was created successfully.",
          "Transaction PIN was created successfully.",
          200
        )
      );
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .send(
        response.responseError(
          error.message,
          false,
          "Sorry! Failed to create transaction PIN.",
          "Sorry! Failed to create transaction PIN.",
          500
        )
      );
  }
};
