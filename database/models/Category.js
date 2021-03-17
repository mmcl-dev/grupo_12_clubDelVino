module.exports = function(sequelize, dataTypes) {
    let alias = "Category";

    let cols = {
        id_category: {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true 
        },
        category_name : {
            type : dataTypes.STRING
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: true
        },
        updated_at: {
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
            as: "products",
            foreignKey : "category_id"
        })
    }
    return Category;

}