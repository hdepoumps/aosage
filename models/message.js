const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Message = sequelize.define("Message", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    contenu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateHeure: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Message;
