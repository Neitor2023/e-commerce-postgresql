const { Sequelize } = require("sequelize");

const db = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
    dialect: process.env.DB_DIALECT,
    logging: false
});

module.exports = db;