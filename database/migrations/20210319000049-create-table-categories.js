'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  //creacion de la tabla
  await queryInterface.createTable('categories', {
      id_category: {
        type : dataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true 
      },
      category_name : {
          type : dataTypes.STRING,
          allowNull: false
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
    await queryInterface.dropTable('categories');
  }
};
