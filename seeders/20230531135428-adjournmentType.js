'use strict';

/** @type {import('sequelize-cli').Migration} */
const AdjournmentTypeModel = require('../models').AdjournmentType;
var { faker } = require('@faker-js/faker');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(AdjournmentTypeModel.tableName, [
            { adjournment_type: 'Assigned', status: 0, createdAt: new Date(), updatedAt: new Date() },
            { adjournment_type: 'For Judgment', adjournment_type_abv : "J", status: 1, createdAt: new Date(), updatedAt: new Date() },
            { adjournment_type: 'For Ruling',  adjournment_type_abv : "R", status: 1, createdAt: new Date(), updatedAt: new Date() },
            { adjournment_type: 'For Further Hearing', status: 1, createdAt: new Date(), updatedAt: new Date() },
            { adjournment_type: 'Closed Case', status: 0, createdAt: new Date(), updatedAt: new Date() },
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(AdjournmentTypeModel.tableName, null, {});
    }
};
