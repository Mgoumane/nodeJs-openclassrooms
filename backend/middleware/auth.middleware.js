const jsonWebToken = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		// Extraction du token de le requête entrante, le split permet de retirer le mot Bearer
		const token = req.headers.authorization.split(" ")[1];

        // Décodage du Token 
		const decodedToken = jsonWebToken.verify(token, "RANDOM_TOKEN_SECRET");

        // Extraction de l'ID présent dans le token
		const userId = decodedToken.userId;

        // Ajout de l'ID à la requête entrante
		req.auth = {
			userId: userId,
		};

        // Si tout se passe bien, on peut passer à la suite
		next();

	} catch (error) {
        // Si il y'a erreur, le Middleware renvoi un code status 401 au client 
		res.status(401).json({ error });
	}
};
