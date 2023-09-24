'use strict';
const roleModel = require('../models').Role;


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(roleModel.tableName, [
      { role_name: 'Super Admin', role_description: 'Oversee all the entire system', createdAt : new Date(), updatedAt : new Date()},
      { role_name: 'Admin', role_description: 'Oversee some part of the system', createdAt : new Date(), updatedAt : new Date()},
      { role_name: 'Staff', role_description: 'Oversee Department operations', createdAt : new Date(), updatedAt : new Date()},
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(roleModel.tableName, null, {});
  }
};
