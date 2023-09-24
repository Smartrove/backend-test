'use strict';
const CaseTypeModel = require('../models').CaseType;
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
        */

        await queryInterface.bulkInsert(CaseTypeModel.tableName, [
            { case_type: 'Civil', case_color: 'green', status: 1, createdAt: new Date(), updatedAt: new Date() },
            { case_type: 'Criminal', case_color: 'red', status: 1, createdAt: new Date(), updatedAt: new Date() },
            { case_type: 'Political', case_color: 'blue', status: 1, createdAt: new Date(), updatedAt: new Date() },
        ])
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete(CaseTypeModel.tableName, null, {});
    }
};
