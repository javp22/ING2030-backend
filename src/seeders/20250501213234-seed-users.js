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
      id: 1,
      username: 'user1',
      email: 'user1@email.com',
      password: 'user1pass',
      profilePicture: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      username: 'user2',
      email: 'user2@email.com',
      password: 'user2pass',
      profilePicture: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      username: 'user3',
      email: 'user3@email.com',
      password: 'user3pass',
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