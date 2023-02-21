'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Grades', [{
        studentId: 1,
        materiaId: 1,
        semestre: 6,
        firstParcial: 10,
        secondParcial: 10,
        thirdParcial: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Grades', null, {});
  }
};
