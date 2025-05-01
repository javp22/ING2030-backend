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
      username: 'diegoga',
      email: 'diegoga@mail.com',
      password: 'diegogapass',
      profilePicture: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'xavierzoz',
      email: 'xavierzoz@mail.com',
      password: 'xavierzozpass',
      profilePicture: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'crisplaza09',
      email: 'crisplaza09@mail.com',
      password: 'crisplaza09pass',
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