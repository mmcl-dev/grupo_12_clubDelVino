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
            defaultValue: 'defaultImageUser.jpg'
        },
        cart_id: {
            type: dataTypes.INTEGER,
            allowNull: true
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

    // Definición de asociaciones
    User.associate = function(models) {
        //relación muchos a muchos User-Product: este User.js es para: 'un user --> muchos productos'
        User.belongsToMany(models.Product, {
            as: "products",
            through: "user_product",
            foreignKey : "user_id",
            otherKey: "product_id",
            timestamps: false,
        });
     }

    return User;
}