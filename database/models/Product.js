const Sequelize = require('sequelize');

module.exports = (sequelize, dataTypes)=>{
    let alias = 'product';
    let columns = {
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
            defaultValue: 'defaultImageUser.jpg'
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
        tableName = 'products',
        timestamps = true
    };

    const Product = sequelize.define(alias, columns, config);

    Product.associate = function(models) {
        //relación uno a muchos, vista desde "uno": un producto pertenece a una categoría
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey : "category_id"
        });

        // relacion muchos a muchos: un producto puede tenerlo varios users
        // user-product es tabla pivot. Tiene su propio indice id
        Product.belongsToMany(models.User, {
            as: "users",
            through: "user_product",
            foreignKey : "user_id",
            otherKey: "product_id",
            timestamps: false,

        });    

    }
    return Product;
}