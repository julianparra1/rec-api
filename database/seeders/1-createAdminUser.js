'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
        name: 'admin',
        email: 'admin@admin.com',
        password: '$2a$10$beQAS4ltZ4gs/KfKmGzFA.FMFqtRdLDuJaQJQf/G9M4NxBcKVBfXm',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
