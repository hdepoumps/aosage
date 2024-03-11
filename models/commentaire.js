const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Commentaire = sequelize.define("Commentaire", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    contenu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Commentaire;
