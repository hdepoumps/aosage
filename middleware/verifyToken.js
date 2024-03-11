// middleware.js
const jwt = require("jsonwebtoken");

// Fonction middleware pour vérifier le token JWT
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).json({ error: "Token manquant." });
    }

    jwt.verify(token, "votre_secret_key_secrete", (err, decoded) => {
        if (err) {
            console.log("Error verifying token:", err);
            return res.status(401).json({ error: "Token invalide." });
        }

        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;
