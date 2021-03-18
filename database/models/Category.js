module.exports = function(sequelize, dataTypes) {
    let alias = "Category";

    let cols = {
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
    };

    let config = {
        tableName : "categories",
        timestamps : false    
    };

    let Category = sequelize.define(alias, cols, config);

    // Definición de asociaciones
    Category.associate = function(models) {
        //relación uno a muchos, vista desde "muchos": una categoría puede pertenecer a varios productos
        Category.hasMany(models.Product, {
            as: "productos",
            foreignKey : "category_id"
        })
    }
    return Category;

}