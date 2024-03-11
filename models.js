// models.js
const sequelize = require("./sequelize");
// Dans models.js
console.log("Associations des modèles définies.");

// Import des modèles
const Utilisateur = require("./models/utilisateur");
const Plante = require("./models/plante");
const Post = require("./models/post");
const Commentaire = require("./models/commentaire");
const Conversation = require("./models/conversation");
const Message = require("./models/message");

// Associations entre les tables
Utilisateur.hasMany(Plante);
Plante.belongsTo(Utilisateur);

Utilisateur.hasMany(Post);
Post.belongsTo(Utilisateur, { foreignKey: "UtilisateurId" });
Conversation.belongsTo(Utilisateur, { foreignKey: "UtilisateurId" });
// Relation avec Utilisateur (deux utilisateurs par conversation)
// Conversation.belongsToMany(Utilisateur, { through: 'UtilisateurConversation' });
Conversation.hasMany(Message);
Utilisateur.hasMany(Message);
Message.belongsTo(Utilisateur);
Commentaire.belongsTo(Utilisateur);
Commentaire.belongsTo(Post);
Plante.hasMany(Post);
Post.belongsTo(Plante, { foreignKey: "PlanteId" });

sequelize.sync();


module.exports = {
    Plante,
    Post,
    Utilisateur,
    Conversation,
    Message,
    Commentaire,
};