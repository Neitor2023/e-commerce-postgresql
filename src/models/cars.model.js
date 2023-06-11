const db = require('../utils/database');
const { DataTypes } = require('sequelize');

const Cars = db.define('cars', {
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
},
    {
        timestamps: false,
    }
);

module.exports = Cars;