const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Post = sequelize.define("Post", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    libelle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Post;
