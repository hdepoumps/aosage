const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize"); // Assurez-vous que le chemin est correct

const Utilisateur = sequelize.define("Utilisateur", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mdp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Utilisateur;
