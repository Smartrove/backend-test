'use strict';

/** @type {import('sequelize-cli').Migration} */
const RemarkModel = require('../models').Remark;
var { faker } = require('@faker-js/faker');

module.exports = {
    async up(queryInterface, Sequelize) {
        let remarkData = [];
        for (var i = 1; i <= 10; i++) {
            let remarks = {
                user_id: 1,
                case_diary_id: 1,
                // platform: faker.internet.userAgent(),
                platform: "web",
                remark: faker.random.words(),
                status: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            remarkData.push(remarks)
        }
        await queryInterface.bulkInsert(RemarkModel.tableName, remarkData);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(RemarkModel.tableName, null, {});
    }
};
