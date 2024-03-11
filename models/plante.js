const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Plante = sequelize.define("Plante", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: DataTypes.BLOB,
});

module.exports = Plante;
