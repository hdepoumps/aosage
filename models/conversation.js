const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Conversation = sequelize.define("Conversation", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idRecepteur: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Conversation;
