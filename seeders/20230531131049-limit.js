'use strict';

/** @type {import('sequelize-cli').Migration} */
const LimitModel = require('../models').Limit;
var { faker } = require('@faker-js/faker');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(LimitModel.tableName, [
            { day: 'Sunday', limit: 3, status: 1, createdAt: new Date(), updatedAt: new Date() },
            { day: 'Monday', limit: 5, status: 1, createdAt: new Date(), updatedAt: new Date() },
            { day: 'Tuesday', limit: 4, status: 1, createdAt: new Date(), updatedAt: new Date() },
            { day: 'Wednesday', limit: 7, status: 1, createdAt: new Date(), updatedAt: new Date() },
            { day: 'Thursday', limit: 10, status: 1, createdAt: new Date(), updatedAt: new Date() },
            { day: 'Friday', limit: 2, status: 1, createdAt: new Date(), updatedAt: new Date() },
            { day: 'Saturday', limit: 1, status: 1, createdAt: new Date(), updatedAt: new Date() },
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(LimitModel.tableName, null, {});
    }
};
