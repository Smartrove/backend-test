'use strict';

/** @type {import('sequelize-cli').Migration} */

const CaseDiaryModel = require('../models').CaseDiary;
const CaseAttachementModel = require('../models').CaseAttachement;
const CaseModel = require('../models').Case;
const CaseTypeModel = require('../models').CaseType;
var { faker } = require('@faker-js/faker');
const moment = require('moment');


module.exports = {
    async up(queryInterface, Sequelize) {

        const caseDiary = [];
        const caseAttachement = [];
        const caseTypes = await CaseModel.findAll();

        function generateRandomDate() {
            let date = faker.date.between('2023-01-01', '2023-12-31');
            let dayOfWeek = moment(date).isoWeekday();

            while (dayOfWeek === 6 || dayOfWeek === 7) { // 6 = Saturday, 7 = Sunday
                date = faker.date.between('2023-01-01', '2023-12-31');
                dayOfWeek = moment(date).isoWeekday();
            }

            return date;
        }

        //weekdays in the order: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        //caseType and dateHeld variables for the case diary being created
        const caseType = 'Criminal'; // The type of case being created
        const dateHeld = generateRandomDate(); // The date of the case diary being created


        const generateFakeCaseDiary = async () => {

            // try {
            //     for (let month = 1; month <= 12; month++) {

            //         for (let i = 1; i <= 5; i++) {

            //             const caseType = caseTypes[Math.floor(Math.random() * caseTypes.length)];
            //             const dateHeld = generateRandomDate();
            //             const caseCatTypeId = dateHeld.getDay() === 4 ? 2 : caseType.case_type_cat_id;


            //             if (dateHeld.getDay() === 4) {
            //                 const caseDiaryData = {
            //                     case_type_id: caseType.case_type_id,
            //                     case_type_cat_id: caseType.case_type_cat_id,
            //                     adjournment_type_id: faker.datatype.number({ min: 2, max: 3 }),
            //                     // date_held: faker.date.between(`2023-${month}-01`, `2023-${month}-31`),
            //                     // date_held: generateRandomDate(),
            //                     date_held: dateHeld,
            //                     platform: "web",
            //                     location: faker.address.city(),
            //                     description: faker.random.words(),
            //                     status: 1,
            //                     createdAt: new Date(),
            //                     updatedAt: new Date()
            //                 };


            //                 let data = caseDiary.push(caseDiaryData);

            //                 let caseAttachementData = {
            //                     case_id: caseType.id,
            //                     // case_diary_id: faker.datatype.number({ min: 1, max: 60 }),
            //                     case_diary_id: data++,
            //                     user_id: faker.datatype.number({ min: 1, max: 5 }),
            //                     status: 1,
            //                     createdAt: new Date(),
            //                     updatedAt: new Date()
            //                 }
            //                 caseAttachement.push(caseAttachementData);
            //             } else {
            //                 const caseDiaryData = {
            //                     case_type_id: caseType.case_type_id,
            //                     case_type_cat_id: caseType.case_type_cat_id,
            //                     adjournment_type_id: faker.datatype.number({ min: 2, max: 4 }),
            //                     // date_held: faker.date.between(`2023-${month}-01`, `2023-${month}-31`),
            //                     // date_held: generateRandomDate(),
            //                     date_held: dateHeld,
            //                     platform: "web",
            //                     location: faker.address.city(),
            //                     description: faker.random.words(),
            //                     status: 1,
            //                     createdAt: new Date(),
            //                     updatedAt: new Date()
            //                 };


            //                 let data = caseDiary.push(caseDiaryData);

            //                 let caseAttachementData = {
            //                     case_id: caseType.id,
            //                     // case_diary_id: faker.datatype.number({ min: 1, max: 60 }),
            //                     case_diary_id: data++,
            //                     user_id: faker.datatype.number({ min: 1, max: 5 }),
            //                     status: 1,
            //                     createdAt: new Date(),
            //                     updatedAt: new Date()
            //                 }
            //                 caseAttachement.push(caseAttachementData);
            //             }


            //         }
            //     }
            // } catch (error) {
            //     console.error('Error seeding case diaries:', error);
            // }

        };

        // Call the function to seed the data
        generateFakeCaseDiary();

        await queryInterface.bulkInsert(CaseDiaryModel.tableName, caseDiary);
        await queryInterface.bulkInsert(CaseAttachementModel.tableName, caseAttachement);
    },


    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(CaseDiaryModel.tableName, null, {});
        await queryInterface.bulkDelete(CaseAttachementModel.tableName, null, {});
    }
};
