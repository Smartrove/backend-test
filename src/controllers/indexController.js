const express = require('express');
const passport = require('passport');
require('../../config/passport')(passport);
const Helper = require('../utils/helper');
const helper = new Helper();
// Compile the source code



// Display welcome note
exports.index = (req, res) => {
    res.render('index', {
        title: 'Welcome to FastaMoni Assessment Backend API',
        copyright: `Smartrove | Copyright © ${new Date().getFullYear()} . All rights reserved.`
    });
    // res.status(200).render("index");
};
