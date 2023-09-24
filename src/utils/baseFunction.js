var express = require('express');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config/config.js');
const { Op } = require("sequelize");
const nodemailer = require('nodemailer');
require("dotenv").config();
var pug = require('pug');







//##################### THIS CONTAIN FUNCTIONS THAT CAN BE RE-USEABLE ###########
class BaseFunction {
    constructor() {

    }

    //######## success response
    responseSuccess(data = null, success = null, message = null, description = "Operation was successful.", statusCode = 200) {
        return (
            {
                "status": statusCode,
                "success": success,
                "message": message,
                "description": description,
                "data": data,
            }
        );
    }

    //######## error response
    responseError(data = null, success = null, message = null, description = "Operation not successful! An error occurred.", statusCode = 400) {
        return (
            {
                "status": statusCode,
                "success": success,
                "message": message,
                "description": description,
                "error": data,
            }
        );
    }

    rawQueryConnection() {
        // SEQUELIZE DB CONFIG
        var conn = this.currentConnection();
        const sequelize = new Sequelize(conn.database, conn.username, conn.password, {
            host: conn.host,
            dialect: conn.dialect,
        });

        return sequelize;
    }


    //Get the current Database connected to
    currentConnection() {
        // You can call it like:
        // var conn = baseFunction.currentConnection(); OR var conn = currentConnection();
        // console.log(conn.database);
        var mode = process.env.NODE_ENV;
        const activeConnection = {
            "database": config[mode].database,
            "username": config[mode].username,
            "password": config[mode].password,
            "host": config[mode].host,
            "dialect": config[mode].dialect
        }
        return activeConnection;
    }

    async sendMailToStaffEmail(user, token) {
        let isNodemailerConnected = false;
        // Create an email transporter
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            service: process.env.MAIL_MAILER,
            secure: process.env.MAIL_ENCRYPTION,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            },
        });
        // console.log("my transporter", transporter);
        transporter.verify(function (error, success) {
            if (error) {
                console.log("transporter", error);
            } else {
                // console.log('Server is ready to take our messages', success);
                isNodemailerConnected = true;
            }
        });

        // const templatePath = path.resolve(__dirname);
        const templatePath = path.join(__dirname, "../views/mail/forget_password.pug");

        const compiledFunction = pug.compileFile(templatePath);
        const name = `${user.first_name} ${user.last_name}`;
        const resetLink = `${process.env.APP_URL}:${process.env.FRONTEND_PORT}/reset-password/${token}`;
        const title = 'Reset Password';
        const year = new Date().getFullYear();

        // Render the HTML email content using the Pug template and the provided data
        const htmlContent = compiledFunction({ name, resetLink, title, token, year });


        // var sendMail = async (content, resetLink, next) => {
        var mailOptions = {
            from: process.env.MAIL_FROM_ADDRESS,
            to: user.email,
            subject: 'Password Reset Request',
            html: htmlContent,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    };

}
module.exports = BaseFunction;
