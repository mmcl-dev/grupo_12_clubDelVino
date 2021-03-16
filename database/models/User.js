const Sequelize = require('sequelize');

module.exports = (sequelize, dataTypes)=>{
    let alias = 'user';
    let columns = {
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
        type_user: {
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
            defaultValue: 'defaultImageUser.jpg'
        },
        products_cart_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                // referencia a la otra tabla
                model: productcs_carts,         
                // nombre de la columna a la que hace referencia la FORENGKEY
                key: 'id_products_cart',
            }
        },
        created_at: {
            type: dataTipe.DATE,
            allowNull: true
        },
        updated_at: {
            type: dataTipe.DATE,
            allowNull: true
        }

    };
    let config = {
        tableName = 'users',
        timestamps = true
    };

    const User = sequelize.define(alias, columns, config);
    return User;
}