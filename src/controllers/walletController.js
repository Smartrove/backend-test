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
const Wallet = require('../../models').Wallet;





// POST: Create Transaction Pin for a User
exports.createWallet = async (req, res) => {
    try {
        exports.getBalance = async (req, res) => {
            const userId = req.params.userId;
            try {
              const wallet = await Wallet.findOne({ where: { userId } });
              if (wallet) {
                return res.status(200).send(response.responseSuccess(wallet.balance, true, 'Wallet balance retrieved successfully.', 200));
              } else {
                return res.status(404).send(response.responseError([], false, 'Wallet not found for the user.', 'Wallet not found for the user.', 404));
              }
            } 
            catch (error) {
              console.error(error.message);
              return res.status(500).send(response.responseError(error.message, false, 'Failed to retrieve wallet balance.', 'Failed to retrieve wallet balance.', 500));
            }}

    } catch (error) {
        console.error(error.message);
        return res.status(500).send(response.responseError(error.message, false, 'Sorry! Failed to create transaction PIN.', 'Sorry! Failed to create transaction PIN.', 500));
    }
};

exports.addFunds = async (req, res) => {
    const userId = req.params.userId;
    const { amount } = req.body;
    try {
      const wallet = await Wallet.findOne({ where: { userId } });
      if (wallet) {
        wallet.balance += parseFloat(amount);
        await wallet.save();
        return res.status(200).send(response.responseSuccess(wallet.balance, true, 'Funds added to the wallet successfully.', 200));
      } else {
        return res.status(404).send(response.responseError([], false, 'Wallet not found for the user.', 'Wallet not found for the user.', 404));
      }
    } catch (error) {
      console.error(error.message);
      return res.status(500).send(response.responseError(error.message, false, 'Failed to add funds to the wallet.', 'Failed to add funds to the wallet.', 500));
    }
  };
