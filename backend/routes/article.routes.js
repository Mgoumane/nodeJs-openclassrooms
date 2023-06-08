const express = require("express");
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware')

const articleController = require("../controllers/article.controller");


// Redirection vers les controllers
    router.post("/", authMiddleware, articleController.createArticle);
    router.get("/:id", authMiddleware, articleController.findOneArticle);
    router.put("/:id", authMiddleware, articleController.updateArticle);
    router.delete("/:id", authMiddleware, articleController.deleteOneArticle);
    router.get("/", authMiddleware, articleController.getAllArticle);

module.exports = router;
