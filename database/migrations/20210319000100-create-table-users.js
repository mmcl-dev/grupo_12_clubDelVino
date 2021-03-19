'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //creacion de la tabla
    await queryInterface.createTable('users', { 
      id_user: {
          type: dataTypes.INTEGER,
          primaryKey:  true,
          autoincrement: true,
          allowNull: false
      },
      first_name: { 
          type: dataTypes.STRING,
          allowNull: false
      },
      last_name: { 
          type: dataTypes.STRING,
          allowNull: false
      },
      user_type: {
          type: dataTypes.STRING,
          allowNull: false
      },
      email: {
          type: dataTypes.STRING,
          allowNull: false
      },
      password: {
          type: dataTypes.STRING,
          allowNull: false
      }, 
      image: {
          type: dataTypes.STRING,
          allowNull: false,
          defaultValue: 'defaultImageUser.jpg'
      },
      createdAt: {
          type: dataTypes.DATE,
          allowNull: true
      },
      updatedAt: {
          type: dataTypes.DATE,
          allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    //revertir la creacion de la tabla
    await queryInterface.dropTable('users');
  }
};
