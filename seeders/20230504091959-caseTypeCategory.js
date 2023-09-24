'use strict';
const CaseTypeCategoryModel = require('../models').CaseTypeCategory;
/** @type {import('sequelize-cli').Migration} */
module.exports = {

    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(CaseTypeCategoryModel.tableName, [
            { case_type_cat: 'Motion', case_type_cat_abv: 'M', status: 1, createdAt: new Date(), updatedAt: new Date() },
            { case_type_cat: 'Appeal', case_type_cat_abv: 'A', status: 1, createdAt: new Date(), updatedAt: new Date() },
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(CaseTypeCategoryModel.tableName, null, {});
    }
};
