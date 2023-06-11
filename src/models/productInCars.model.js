const db = require('../utils/database');
const { DataTypes } = require('sequelize');

const ProductInCars = db.define('productincars', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    carId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'car_id'
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'product_id'
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.REAL,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
},
    {
        timestamps: false,
    }
);

module.exports = ProductInCars;