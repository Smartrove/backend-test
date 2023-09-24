'use strict';
const HolidayModel = require('../models').Holiday;
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert(HolidayModel.tableName, [
      { year: '2023', month: '01', day: '01', is_holiday: 1, status: 1, createdAt: new Date(), updatedAt: new Date() },
      { year: '2023', month: '04', day: '07', is_holiday: 1, status: 1, createdAt: new Date(), updatedAt: new Date() },
      { year: '2023', month: '05', day: '01', is_holiday: 1, status: 1, createdAt: new Date(), updatedAt: new Date() },
      { year: '2023', month: '10', day: '01', is_holiday: 1, status: 1, createdAt: new Date(), updatedAt: new Date() },
      
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(HolidayModel.tableName, null, {});
  }
};
