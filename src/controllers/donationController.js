require("dotenv").config();
const express = require("express");
const User = require("../../models").User;
const passport = require("passport");
require("../../config/passport")(passport);
const Helper = require("../utils/helper");
const helper = new Helper();
const Response = require("../utils/response");
const response = new Response();
const BaseFunction = require("../utils/baseFunction");
const baseFunction = new BaseFunction();
const env = require("dotenv").config();
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const Path = require("path");
const Moment = require("moment");
const Donation = require("../../models").Donation;
const { validationResult } = require("express-validator");

const transporter = require("../../config/nodemailer");

// Map to store user_id and donation counts
const userDonationCounts = new Map();

// POST: Create Donation
exports.donate = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Check if required parameters are present in the request body
    if (!req.body.user_id || !req.body.receiver_id || !req.body.donatedAmount) {
      const message = "Please provide user_id, receiver_id, and donatedAmount.";
      return res
        .status(400)
        .send(
          response.responseError([], false, "Unable to donate!", message, 400)
        );
    }

    const userId = req.body.user_id;

    // Verify if both the donating user and the receiving user exist
    const donatingUser = await User.findByPk(userId);
    const receivingUser = await User.findByPk(req.body.receiver_id);

    if (!donatingUser || !receivingUser) {
      const message = "Donating user or receiving user not found.";
      return res
        .status(404)
        .send(
          response.responseError([], false, "User not found.", message, 404)
        );
    }

    // Deduct the donated amount from the donating user's balance
    if (donatingUser.balance < req.body.donatedAmount) {
      const message = "Insufficient balance for donation.";
      return res
        .status(400)
        .send(
          response.responseError([], false, "Unable to donate!", message, 400)
        );
    }

    donatingUser.balance -= req.body.donatedAmount;
    await donatingUser.save();

    // Add the donated amount to the receiving user's balance
    receivingUser.balance += req.body.donatedAmount;
    await receivingUser.save();

    // Create a donation record to track the transaction
    const newDonation = await Donation.create({
      user_id: userId,
      receiver_id: req.body.receiver_id,
      donatedAmount: req.body.donatedAmount,
    });

    // Check if the user has made two or more donations
    if (!userDonationCounts.has(userId)) {
      userDonationCounts.set(userId, 1);
    } else {
      const donationCount = userDonationCounts.get(userId);
      userDonationCounts.set(userId, donationCount + 1);

      if (donationCount + 1 >= 2) {
        // Send an email notification to the user
        //mail option here
        const mailOptions = {
          from: process.env.MAIL_FROM_ADDRESS,
          to: donatingUser.email, // Use the user's email address
          subject: "You have made multiple donations",
          text: "Thank you for your generosity! You have made two or more donations.",
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Email could not be sent:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });
      }
    }

    return res
      .status(200)
      .send(
        response.responseSuccess(
          newDonation,
          true,
          "Donation successful.",
          "Donation successful.",
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
          "Sorry! Failed to process donation.",
          "Sorry! Failed to process donation.",
          500
        )
      );
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
  // user_id is passed as a route parameter
  const { user_id } = req.params;

  try {
    // Find all donations where the donating user's user_id matches the provided user_id
    const donations = await Donation.findAll({
      where: {
        user_id: user_id,
      },
      attributes: ["user_id", "receiver_id", "donatedAmount", "createdAt"], // Include additional attributes as needed
      order: [["createdAt", "DESC"]], // Order the donations by createdAt in descending order
    });

    if (donations.length === 0) {
      return res
        .status(404)
        .send(
          response.responseError(
            [],
            false,
            "No donations found for the user.",
            "No donations found for the user.",
            404
          )
        );
    }

    return res
      .status(200)
      .send(
        response.responseSuccess(
          donations,
          true,
          "Donations retrieved successfully.",
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
          "Sorry! Unable to retrieve donations.",
          "Sorry! Unable to retrieve donations.",
          500
        )
      );
  }
};

exports.getUserDonationCount = async (req, res) => {
  const { user_id } = req.params;
  try {
    // Count the donations for the user with the provided userId
    const donationCount = await Donation.count({
      where: {
        user_id,
      },
    });
    res
      .status(200)
      .send(
        response.responseSuccess(
          donationCount,
          true,
          "user Donation count retrieved successfully!",
          200
        )
      );
  } catch (error) {
    console.error(error.message);
    return response.responseError(
      error.message,
      false,
      "Sorry! Unable to retrieve donations count.",
      "Sorry! Unable to retrieve donations count.",
      500
    );
  }
};

// Add this route to your Express.js application
exports.getSingleDonationToUser = async (req, res) => {
  try {
    const { donation_id } = req.body;
    const { user_id } = req.params;

    // Query the database to find the donation record
    const donation = await Donation.findOne({
      where: {
        id: donation_id,
        user_id: user_id,
      },
    });

    // Check if the donation exists and belongs to the user
    if (!donation) {
      return res.status(404).send({
        message: "Donation not found",
      });
    }

    // Return the donation as a response
    return res.status(200).send({
      message: "Donation retrieved successfully.",
      donation: donation,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({
      message: "Unable to retrieve donation.",
      error: error.message,
    });
  }
};
