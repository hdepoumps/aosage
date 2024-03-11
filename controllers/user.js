const { Utilisateur, Plante } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, "uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});


// Création d'un nouveau compte utilisateur
async function signup(req, res) {
    try {
        const { nom, prenom, mail, mdp, role } = req.body; // Ajouter 'mail' ici

        // Check if a user with the same name, surname, and mail already exists
        const existingUser = await Utilisateur.findOne({
            where: { nom, prenom, mail },
        });

        if (existingUser) {
            return res.status(400).json({
                error: "A user with the same name, surname, and mail already exists.",
            });
        }

        // Hash the password with bcrypt
        const hashedPassword = await bcrypt.hash(mdp, 10);

        // Create a new user
        const utilisateur = await Utilisateur.create({
            nom,
            prenom,
            mail, // Ajouter 'mail' ici
            mdp: hashedPassword,
            role,
        });

        res.json(utilisateur);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating the user." });
    }

}

// Connexion de l'utilisateur avec JSON Web Token
async function login(req, res) {
    try {
        const { mail, mdp } = req.body;

        // Rechercher l'utilisateur par mail
        const utilisateur = await Utilisateur.findOne({ where: { mail } });

        if (!utilisateur) {
            return res.status(401).json({ error: "Mail ou mot de passe incorrect." });
        }

        // Vérifier le mot de passe avec bcrypt
        const isPasswordValid = await bcrypt.compare(mdp, utilisateur.mdp);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Mail ou mot de passe incorrect." });
        }

        // Générer un token JWT
        const token = jwt.sign(
            { id: utilisateur.id, mail: utilisateur.mail },
            "votre_secret_key_secrete",
            {
                expiresIn: "1h",
            }
        );

        // Retourner le token dans la réponse
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la connexion." });
    }
}

// Récupération des informations d'un utilisateur avec ses plantes associées
async function getUser(req, res) {
    try {
        const utilisateurId = req.userId;

        // Rechercher l'utilisateur par son ID avec ses plantes associées
        const utilisateur = await Utilisateur.findByPk(utilisateurId, {
            include: Plante, // Inclure les plantes associées
        });

        if (!utilisateur) {
            return res.status(404).json({ error: "Utilisateur non trouvé." });
        }

        // Retourner les informations de l'utilisateur et ses plantes dans la réponse
        res.json({ utilisateur });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Erreur lors de la récupération de l'utilisateur.",
            details: error.message,
        });
    }
}

// Récupération de tous les utilisateurs avec le rôle botaniste
async function getBotanistes(req, res) {
    try {
        // Rechercher tous les utilisateurs avec le rôle "botaniste"
        const botanistes = await Utilisateur.findAll({
            where: {
                role: "botaniste",
            },
        });

        // Retourner la liste des utilisateurs avec le rôle "botaniste"
        res.json({ utilisateurs: botanistes });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Erreur lors de la récupération des utilisateurs botanistes.",
            details: error.message,
        });
    }
}

module.exports = {
    signup,
    login,
    getUser,
    getBotanistes,
};
