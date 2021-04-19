'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //creacion de la tabla
    await queryInterface.createTable('products', { 
      id_product: {
          type: dataTypes.INTEGER,
          primaryKey:  true,
          autoincrement: true,
          allowNull: false
      },
      product_name: { 
          type: dataTypes.STRING,
          allowNull: false
      },
      description: { 
          type: dataTypes.STRING,
          allowNull: false
      },
      wine_family: {
          type: dataTypes.STRING,
          allowNull: false
      },
      category_id: {
          type: dataTypes.INTEGER,
          allowNull: false
      },
      year: {
          type: dataTypes.INTEGER,
          allowNull: false
      }, 
      price: {
          type: dataTypes.INTEGER,
          allowNull: false
      }, 
      offer: {
          type: dataTypes.BOOLEAN,
          allowNull: false
      }, 
      offer_price: {
          type: dataTypes.INTEGER,
          allowNull: true
      }, 
      image: {
          type: dataTypes.STRING,
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
      references: {
        model: 'categories', // nombre de la tabla referencia
        key: 'id_category', // fk de la tabla referenncia
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    //revertir la creacion de la tabla
    await queryInterface.dropTable('products');
  }
};