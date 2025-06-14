'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // 3 usuarios
    await queryInterface.bulkInsert('Users', [{
      id: 1001,
      username: 'user1',
      email: 'user1@email.com',
      password: 'user1pass',
      profilePicture: '',
      balance: 200000,
      budget: 0,
      spent: 30400,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 1002,
      username: 'user2',
      email: 'user2@email.com',
      password: 'user2pass',
      profilePicture: '',
      balance: 5000000,
      budget: 0,
      spent: 9200,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 1003,
      username: 'user3',
      email: 'user3@email.com',
      password: 'user3pass',
      balance: 300000,
      budget: 0,
      spent: 0,
      profilePicture: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};