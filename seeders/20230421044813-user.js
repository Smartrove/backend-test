'use strict';
const userModel = require('../models').User;
const profileModel = require('../models').Profile;
const bcrypt = require("bcryptjs");
var { faker } = require('@faker-js/faker');




module.exports = {

    up: async (queryInterface, Sequelize) => {
        let usersData = [{
            email: "mbr@gmail.com", //faker.internet.email(firstName).toLowerCase(),
            password: bcrypt.hashSync(process.env.STAFF_DEFAULT_PASSWORD, bcrypt.genSaltSync(10), null), //faker.internet.password(),
            role_id: 1,
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            other_name: faker.name.middleName(),
            suspend: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        }];
        for (var i = 1; i <= 4; i++) {
            let firstName = faker.name.firstName();
            let lastName = faker.name.lastName();
            let middleName = faker.name.middleName();
            let hashPassword = bcrypt.hashSync(process.env.STAFF_DEFAULT_PASSWORD, bcrypt.genSaltSync(10), null);
            let newUsers = {
                email: faker.internet.email(firstName).toLowerCase(),
                password: hashPassword, //faker.internet.password(),
                role_id: 1,
                first_name: firstName,
                last_name: lastName,
                other_name: middleName,
                suspend: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            usersData.push(newUsers);
        }
        await queryInterface.bulkInsert(userModel.tableName, usersData);
    },


    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(userModel.tableName, null, {});
    }

};
