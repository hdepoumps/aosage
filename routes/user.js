const express = require("express");
const router = express.Router();
const utilisateurController = require("../controllers/user");
const verifyToken = require("../middleware/verifyToken");

router.use(express.json());

// Route POST pour créer un nouveau compte utilisateur
router.post("/signup", utilisateurController.signup);

// Route POST pour la connexion de l'utilisateur
router.post("/login", utilisateurController.login);

// Route GET pour obtenir les informations de l'utilisateur connecté
router.get("/utilisateur", verifyToken, utilisateurController.getUser);

// Route GET pour obtenir tous les utilisateurs avec le rôle "botaniste"
router.get("/botanistes", utilisateurController.getBotanistes);

module.exports = router;
