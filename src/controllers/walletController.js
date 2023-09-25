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
const { validationResult } = require("express-validator");
const Wallet = require("../../models").Wallet;

exports.createWallet = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { user_id } = req.body;

  try {
    // Check if a wallet already exists for the user
    const existingWallet = await Wallet.findOne({ where: { user_id } });

    if (existingWallet) {
      return res
        .status(400)
        .send(
          response.responseError(
            [],
            false,
            "Wallet already exists for the user.",
            "Wallet already exists for the user.",
            400
          )
        );
    }

    // Create a new wallet for the user
    const newWallet = await Wallet.create({
      user_id,
      balance: 0,
    });

    return res
      .status(201)
      .send(
        response.responseSuccess(
          newWallet,
          true,
          "Wallet created successfully.",
          201
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
          "Sorry! Failed to create wallet.",
          "Sorry! Failed to create wallet.",
          500
        )
      );
  }
};

exports.getBalance = async (req, res) => {
  const { user_id } = req.params;
  try {
    const wallet = await Wallet.findOne({ where: { user_id } });
    if (wallet) {
      return res
        .status(200)
        .send(
          response.responseSuccess(
            wallet.balance,
            true,
            "Wallet balance retrieved successfully.",
            200
          )
        );
    } else {
      return res
        .status(404)
        .send(
          response.responseError(
            [],
            false,
            "Wallet not found for the user.",
            "Wallet not found for the user.",
            404
          )
        );
    }
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .send(
        response.responseError(
          error.message,
          false,
          "Failed to retrieve wallet balance.",
          "Failed to retrieve wallet balance.",
          500
        )
      );
  }
};

