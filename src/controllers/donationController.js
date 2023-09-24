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
const Donation = require('../../models').Donation;


// POST: Create Donation
exports.donate = async (req, res) => {
    try {
        // Check if required parameters are present in the request body
        if (!req.body.user_id || !req.body.receiver_id || !req.body.donatedAmount) {
            const message = 'Please provide user_id, receiver_id, and donatedAmount.';
            return res.status(400).send(response.responseError([], false, 'Unable to donate!', message, 400));
        }

        // Verify if both the donating user and the receiving user exist
        const donatingUser = await User.findByPk(req.body.user_id);
        const receivingUser = await User.findByPk(req.body.receiver_id);

        if (!donatingUser || !receivingUser) {
            const message = 'Donating user or receiving user not found.';
            return res.status(404).send(response.responseError([], false, 'User not found.', message, 404));
        }

        // Deduct the donated amount from the donating user's balance
        if (donatingUser.balance < req.body.donatedAmount) {
            const message = 'Insufficient balance for donation.';
            return res.status(400).send(response.responseError([], false, 'Unable to donate!', message, 400));
        }

        donatingUser.balance -= req.body.donatedAmount;
        await donatingUser.save();

        // Add the donated amount to the receiving user's balance
        receivingUser.balance += req.body.donatedAmount;
        await receivingUser.save();

        // Create a donation record to track the transaction
        const newDonation = await Donation.create({
            user_id: req.body.user_id,
            receiver_id: req.body.receiver_id,
            donatedAmount: req.body.donatedAmount,
            // You can add other fields as needed
        });

        return res.status(200).send(response.responseSuccess(newDonation, true, 'Donation successful.', 'Donation successful.', 200));
    } catch (error) {
        console.error(error.message);
        return res.status(500).send(response.responseError(error.message, false, 'Sorry! Failed to process donation.', 'Sorry! Failed to process donation.', 500));
    }
};



exports.getUserDonations = async (req, res) => {
  const { user_id } = req.body;
  Donation.findAll({
    order: [["createdAt", "DESC"]],
  })
    .then((donations) => {
      console.log(donations);
      res
        .status(200)
        .send(
          response.responseSuccess(
            donations,
            true,
            "user Donations retrieve successfully!",
            200
          )
        );
    })
    .catch((error) => {
      console.log(error.message);
      res
        .status(400)
        .send(
          response.responseError(
            error.message,
            false,
            "Sorry! unable to retrieve donations",
            "Sorry! unable to retrieve donations",
            400
          )
        );
    });
};
exports.getSingleUserDonations = async (req, res) => {
  Donation.findOne({
    where: {
      user_id,
    },
    attributes: ["user_id", "receiver_id", "donatedAmount"],
  })
    .then((donations) => {
      console.log(donations);
      res
        .status(200)
        .send(
          response.responseSuccess(
            donations,
            true,
            "Donations retrieve successfully!",
            200
          )
        );
    })
    .catch((error) => {
      console.log(error.message);
      res
        .status(400)
        .send(
          response.responseError(
            error.message,
            false,
            "Sorry! unable to retrieve donations",
            "Sorry! unable to retrieve donations",
            400
          )
        );
    });
};



