const express = require("express");
const router = express.Router();

const authController = require('../controllers/auth.controller')

// Redirection vers le controller 
    router.post('/signup' , authController.signup)
    router.post('/login' , authController.login)

module.exports = router;