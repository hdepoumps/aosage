const http = require('http');
const app = require('./app');
const sequelize = require('./sequelize');
// Fonction pour normaliser le port

const normalizePort = val => {
  const port = parseInt(val, 10);

  // Vérifier si le port est un nombre
  if (isNaN(port)) {
    return val;
  }
  // Vérifier si le port est valide
  if (port >= 0) {
    return port;
  }
  return false;
};

// Définir le port avec la valeur normalisée ou par défaut à 3000
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Fonction pour gérer les erreurs lors de la configuration du serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // Obtenir l'adresse du serveur et les informations de liaison
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;

  // Gérer des cas d'erreur spécifiques
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};
// Créer un serveur HTTP en utilisant app.js
const server = http.createServer(app);

// Synchronisation du modèle avec la base de données
sequelize.sync()
    .then(() => {
      console.log('Modèle synchronisé avec la base de données.');
    })
    .catch(err => {
      console.error('Erreur lors de la synchronisation du modèle avec la base de données :', err);
    });

// Gestionnaires d'événements pour les erreurs du serveur et l'écoute
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// Démarrer le serveur et écouter sur le port spécifié
server.listen(port, '0.0.0.0');
