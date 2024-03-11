const { Plante, Post, Utilisateur, Commentaire} = require("../models");

// Obtention de toutes les plantes de l'utilisateur connecté
async function getPlantes(req, res) {
    try {
        console.log("User ID:", req.userId);

        // Rechercher toutes les plantes
        const plantes = await Plante.findAll();
        res.json({ plantes });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Erreur lors de la récupération des plantes.",
            details: error.message,
        });
    }
}

// Création d'une nouvelle plante
async function createPlante(req, res) {
    try {
        const { nom, description, image } = req.body;
        const userId = req.userId;

        // Vérifiez que 'image' est correctement défini
        if (!image) {
            return res.status(400).json({ error: "L'image est manquante." });
        }

        // Convertissez les données binaires de l'image en base64
        const imageBuffer = Buffer.from(image, "base64");

        // Créez une nouvelle plante en utilisant les données de l'image
        const plante = await Plante.create({
            nom,
            description,
            image: imageBuffer,
            userId,
        });
        res.json({ plante });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la création de la plante." });
    }
}
async function getPost(req, res) {
    try {
        // Récupérer tous les posts avec les informations de la plante associée et de l'auteur
        const postsWithUserInfo = await Post.findAll({
            include: [
                {
                    model: Plante,
                    attributes: ["id", "nom", "description", "image"],
                },
                {
                    model: Utilisateur,
                    attributes: ["nom", "prenom"],
                },
            ],
        });

        // Remplacer les données d'image dans les posts avec les données d'image de la plante
        const postsWithImagesAndUserInfo = postsWithUserInfo.map((post) => {
            const plante = post.Plante;
            const utilisateur = post.Utilisateur;

            if (plante && plante.image) {
                const base64Image = `data:image/jpeg;base64,${plante.image.toString(
                    "base64"
                )}`;

                return {
                    ...post.toJSON(),
                    image: base64Image,
                    Plante: undefined,
                    Utilisateur: undefined,
                    auteur: {
                        nom: utilisateur && utilisateur.nom,
                        prenom: utilisateur && utilisateur.prenom,
                    },
                };
            }

            return post;
        });

        res.json({ posts: postsWithImagesAndUserInfo });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Erreur lors de la récupération des posts.",
            details: error.message,
        });
    }
}

// Création d'un nouveau post
async function createPost(req, res) {
    try {
        const { libelle, description, planteId } = req.body;
        console.log("Request data:", req.body);
        console.log("User ID extracted from the request:", req.userId);

        // Vérifier si la plante existe
        const planteExistante = await Plante.findByPk(planteId);

        if (!planteExistante) {
            return res.status(404).json({ error: "Plante non trouvée." });
        }

        // Créer le post avec l'ID de l'utilisateur et l'ID de la plante
        const nouveauPost = await Post.create({
            libelle,
            description,
            UtilisateurId: req.userId,
            PlanteId: planteId,
        });

        console.log("Post créé avec succès :", nouveauPost);

        res.json({ nouveauPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la création du post." });
    }
}

async function createComments(req, res) {
    try {
        const { contenu } = req.body;
        const { postId } = req.params;

        // Check if the post exists
        const existingPost = await Post.findByPk(postId);

        if (!existingPost) {
            return res.status(404).json({ error: "Post not found." });
        }

        // Create the comment with the user ID and post ID
        const newComment = await Commentaire.create({
            contenu,
            UtilisateurId: req.userId,
            PostId: postId,
        });

        console.log("Comment created successfully:", newComment);

        res.json({ newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error adding the comment." });
    }
}

async function getComments(req, res) {
    try {
        const { postId } = req.params;
        const comments = await Commentaire.findAll({
            where: { PostId: postId },
        });
        res.json({ comments });
    } catch (error) {
        console.error("Error fetching comments:", error.message);
        res.status(500).json({ error: "Error fetching comments." });
    }

}
module.exports = {
    getPlantes,
    createPlante,
    createPost,
    getPost,
    createComments,
    getComments
};
