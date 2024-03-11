const express = require('express');
const app = express();
const sequelize = require('./sequelize'); // Importez votre instance Sequelize depuis sequelize.js

// Récupération des routes
const userRoutes = require('./routes/user');
const plantepostRoutes = require('./routes/plante');


// Connexion à la base de données
sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données MySQL réussie !');
    })
    .catch(err => {
        console.error('Erreur de connexion à la base de données MySQL :', err);
    });

// Middleware pour permettre les requêtes CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Enregistrement des routes
app.use('/api', userRoutes);
app.use('/api', plantepostRoutes);
module.exports = app;
