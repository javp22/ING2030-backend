'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Una meta para cada usuario, le voy a dejar solo al 1 y 2, para el 3 crear desde 0 
    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);

    await queryInterface.bulkInsert('SavingGoals', [{
      userId: 1,
      title: 'Meta mensual',
      targetAmount: 50000,
      currentAmount: 0,
      period: 'mensual',
      deadline: endOfMonth,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      title: 'Meta mensual',
      targetAmount: 70000,
      currentAmount: 0,
      period: 'mensual',
      deadline: endOfMonth,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SavingGoals', null, {});
  }
};
