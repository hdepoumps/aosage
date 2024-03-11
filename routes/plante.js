const express = require("express");
const router = express.Router();
const planteController = require("../controllers/plante");
const verifyToken = require("../middleware/verifyToken");

router.use(express.json());

// Route GET pour obtenir toutes les plantes de l'utilisateur connecté
router.post("/plantes", verifyToken, planteController.createPlante);
router.get("/plantes", verifyToken, planteController.getPlantes);

// Endpoint pour la création de post
router.post("/posts", verifyToken, planteController.createPost);
router.get("/posts", verifyToken, planteController.getPost);

router.post("/posts/:postId/comments", verifyToken,planteController.createComments);
router.get("/posts/:postId/comments", verifyToken,planteController.getComments);

module.exports = router;
