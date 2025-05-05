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
    //  30 transacciones, 10 para cada usuario
    await queryInterface.bulkInsert('Transactions', [{
      // Transacciones del user1
      userId: 1,
      amount: 30000,
      company: 'Papá',
      category: 'Familiar', // Las categorias igual me las invente, se asume que existiran en el frontend
      date: new Date(2025, 4, 1), // TODO: cambiarle el dia o la hora a estas fechas
      description: 'Deposito mesada',
      type: 'deposito',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      amount: -3200,
      company: 'Starbucks',
      category: 'Comida',
      date: new Date(2025, 4, 1),
      description: 'Cargo compra café 1',
      type: 'cargo',
      createdAt: new Date(),
      updatedAt: new Date()

    }, {
      userId: 1,
      amount: -5000,
      company: 'Metro de Santiago',
      category: 'Transporte',
      date: new Date(2025, 4, 2),
      description: 'Cargo carga TNE 1',
      type: 'cargo',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      amount: -5800,
      company: 'Rappi',
      category: 'Comida',
      date: new Date(2025, 4, 2),
      description: 'Cargo por compra de almuerzo',
      type: 'cargo',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      amount: -3000,
      company: 'Cine Hoyts',
      category: 'Entretenimiento',
      date: new Date(2025, 4, 2),
      description: 'Cargo entrada cine',
      type: 'cargo',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      amount: -3200,
      company: 'Starbucks',
      category: 'Comida',
      date: new Date(2025, 4, 3),
      description: 'Cargo compra café',
      type: 'cargo',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      amount: -5000,
      company: 'Metro de Santiago',
      category: 'Transporte',
      date: new Date(2025, 4, 3),
      description: 'Cargo carga TNE 2',
      type: 'cargo',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      amount: -2000,
      company: 'Spotify',
      category: 'Suscripcion',
      date: new Date(2025, 4, 3),
      description: 'Cargo automatico por suscripcion mensual',
      type: 'cargo',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      amount: 10000,
      company: 'Banco Estado',
      category: 'Banca',
      date: new Date(2025, 4, 3),
      description: 'Deposito por venta',
      type: 'deposito',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 1,
      amount: -3200,
      company: 'Starbucks',
      category: 'Comida',
      date: new Date(2025, 4, 4),
      description: 'Cargo compra café 3',
      type: 'cargo',
      createdAt: new Date(),
      updatedAt: new Date()

    }, {
      // Transacciones del user2
      userId: 2,
      amount: 15000,
      company: 'Papá',
      category: 'Familiar',
      date: new Date(),
      description: 'Deposito mesada semanal',
      type: 'deposito',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      amount: -3200,
      company: 'Almacen RicoPan',
      category: 'Comida',
      date: new Date(),
      description: 'Cargo por compra',
      type: 'cargo',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      amount: -1000,
      company: 'Minimarket Barrio',
      category: 'Comida',
      date: new Date(),
      description: 'Cargo por compra',
      type: 'cargo',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      amount: -5000,
      company: 'Metro de Santiago',
      category: 'Transporte',
      date: new Date(),
      description: 'Cargo carga TNE 2',
      type: 'cargo',
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
    await queryInterface.bulkDelete('Transactions', null, {});
  }
};
