'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //creacion de la tabla
    await queryInterface.createTable('user_product', { 
      id: {
          type: dataTypes.INTEGER,
          primaryKey:  true,
          autoincrement: true,
          allowNull: false
      },
      createdAt: {
          type: dataTypes.DATE,
          allowNull: true
      },
      updatedAt: {
          type: dataTypes.DATE,
          allowNull: true
      },
      user_id: { 
          type: dataTypes.INTEGER,
          allowNull: false
      },
      product_id: { 
          type: dataTypes.INTEGER,
          allowNull: false
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    //revertir la creacion de la tabla
    await queryInterface.dropTable('user_product');
  }
};
