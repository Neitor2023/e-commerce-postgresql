const db = require('../utils/database');
const { DataTypes } = require('sequelize');

const Products = db.define('products', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.REAL,
        allowNull: false
    },
    availableQty: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    productImage: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'product_image'
    },
},
    {
        timestamps: false,
    }
);

module.exports = Products;