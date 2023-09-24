'use strict';

/** @type {import('sequelize-cli').Migration} */
const CaseModel = require('../models').Case;
var { faker } = require('@faker-js/faker');


module.exports = {
    async up(queryInterface, Sequelize) {

        let caseData = [];
        for (var i = 1; i <= 100; i++) {
            let cases = {
                user_id: i,
                case_type_id: faker.datatype.number({ min: 1, max: 3 }),
                case_type_cat_id: faker.datatype.number({ min: 1, max: 2 }),
                suite_no: 'SCN/P/00' + i,
                parties: faker.name.firstName() + ' ' + faker.name.middleName() + ' VS ' + faker.name.middleName() + ' ' + faker.name.firstName(),
                case_desc: faker.random.words(),
                subject_matter: faker.random.words(),
                status: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            caseData.push(cases);
        }
        await queryInterface.bulkInsert(CaseModel.tableName, caseData);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(CaseModel.tableName, null, {});
    }
};
