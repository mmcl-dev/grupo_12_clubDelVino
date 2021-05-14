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
        createdAt: {
            type: dataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: true
        }

    };
    let config = {
        tableName : 'user_product',
        timestamps : true
    };

    const User_Product = sequelize.define(alias, columns, config);

    return User_Product;
}