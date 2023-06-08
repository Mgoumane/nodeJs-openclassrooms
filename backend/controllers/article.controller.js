const Article = require("../models/Article");

exports.createArticle = async (req, res, next) => {
	try {
		delete req.body._id;

		const article = new Article({
			...req.body,
		});
		const response = await article.save();
		res
			.status(201)
			.json([{ message: "Article ajouté en base de données" }, article]);
	} catch (error) {
		res.status(400).json([{ message: "Attention article non ajouté" }, error]);
	}
};

exports.findOneArticle = async (req, res, next) => {
	try {
		const article = await Article.findById(req.params.id);
		res.status(200).json(article);
	} catch (error) {
		res
			.status(400)
			.json({ message: "La demande n'a pas pus être traité correctement" });
	}
};

exports.updateArticle = async (req, res, next) => {
	try {
		const article = await Article.updateOne(
			{ _id: req.params.id },
			{
				...req.body,
				_id: req.params.id,
			}
		);
		res.status(200).json({ message: "Ressource modifié !" });
	} catch (error) {
		res.status(400).json({ error });
	}
};

exports.deleteOneArticle = async (req, res, next) => {
	try {
		const article = await Article.deleteOne({ _id: req.params.id });
		res.status(200).json({ message: "Ressource supprimé !" });
	} catch (error) {
		res.status(400).json({ error });
	}
};

exports.getAllArticle = async (req, res, next) => {
	try {
	    const articles = await Article.find();
		res.status(200).json(articles);
	} catch (error) {
		res
			.status(400)
			.json({ message: "La demande n'a pas pu être traité correctement" });
	}
};
