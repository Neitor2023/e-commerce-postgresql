const db = require('../utils/database');
const { DataTypes } = require('sequelize');

const Orders = db.define('orders', {
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
    totalPrice: {
        type: DataTypes.REAL,
        field: 'total_price'
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

module.exports = Orders;