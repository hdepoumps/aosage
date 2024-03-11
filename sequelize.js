const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DB_USER, DB_PWD, DB_PORT } = process.env;

const sequelize = new Sequelize("arosaje", `${DB_USER}`, `${DB_PWD}`, {
    dialect: "mysql",
    host: "localhost",
    port: DB_PORT,
});

module.exports = sequelize;
