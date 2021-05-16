module.exports = (sequelize, dataTypes)=>{
    let alias = 'User_Product';
    let columns = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey:  true,
            autoIncrement: true,
            // allowNull: false
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: true
        },
        createdAt: {
            type: dataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: true
        }

    };
    let config = {
        tableName : 'user_product',
        timestamps : true
    };

    const User_Product = sequelize.define(alias, columns, config);

    User_Product.associate = function(models) {

         //relación uno a muchos, vista desde "uno": un registro user_product pertenece a un usuario
         User_Product.belongsTo(models.User, {
            as: "usuarios",
            foreignKey : "user_id"
        });

        //relación uno a muchos, vista desde "uno": un registro user_product tiene un producto
        User_Product.belongsTo(models.Product, {
            as: "productos",
            foreignKey : "product_id"
        });

        
    
    }

    return User_Product;
}