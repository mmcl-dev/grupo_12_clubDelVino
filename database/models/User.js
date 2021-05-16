module.exports = (sequelize, dataTypes)=>{
    let alias = 'User';
    let columns = {
        id_user: {
            type: dataTypes.INTEGER,
            primaryKey:  true,
            autoIncrement: true,
            // allowNull: false
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

    };
    let config = {
        tableName : 'users',
        timestamps : true
    };

    const User = sequelize.define(alias, columns, config);

    // Definición de asociaciones
    User.associate = function(models) {
        //relación muchos a muchos User-Product: este User.js es para: 'un user --> muchos productos'
        User.belongsToMany(models.Product, {
            as: "productos",
            through: "user_product",
            foreignKey : "user_id",
            otherKey: "product_id",
            timestamps: false,
        });


        //relación uno a muchos, vista desde "muchos": un usuario puede pertenecer a varios registros user_product
        User.hasMany(models.User_Product, {
            as: "cartusers",
            foreignKey : "user_id"
        })

     }

    return User;
}