'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
        name: 'admin',
        email: 'admin@admin.com',
        password: '$2a$10$txQPE6QkHxIXWJ4yTOS4hO1OiFnuYyZrf/eEEEDnWD/6Jeqr6jjGu',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
