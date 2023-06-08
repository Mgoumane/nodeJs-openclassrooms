// Imports
    const express = require('express');
    const cors = require('cors');

// Import des routes
    const articleRoutes = require('./routes/article.routes');
    const authRouter = require('./routes/user.routes');

// Création de mon application express
    const app = express();

// Middleware 
    app.use(cors());
    app.use(express.json());

    app.use('/api/auth', authRouter);
    app.use('/api/stuff', articleRoutes);
    


// Exportation de mon application
    module.exports = app;