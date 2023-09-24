'use strict';

/** @type {import('sequelize-cli').Migration} */
const CourtRoomModel = require('../models').CourtRoom;
var { faker } = require('@faker-js/faker');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(CourtRoomModel.tableName, [
            { name: 'Court 1', status: 1, createdAt: new Date(), updatedAt: new Date() },
            { name: 'Court 2', status: 1, createdAt: new Date(), updatedAt: new Date() },
            { name: 'Court 3', status: 1, createdAt: new Date(), updatedAt: new Date() },
            { name: 'Court 4', status: 1, createdAt: new Date(), updatedAt: new Date() },
            { name: 'Court 5', status: 1, createdAt: new Date(), updatedAt: new Date() },
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(CourtRoomModel.tableName, null, {});
    }
};
