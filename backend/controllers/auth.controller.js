const User = require('../models/User');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken')

exports.signup = async (req, res, next) => {
    
    try {

        const hash = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            email: req.body.email,
            password: hash
        })
        const enregistrement  = await user.save();
        res.status(201).json({ message: "Utilisateur créé"});

    } catch (error) {
        res.status(500).json( error )
    }

};

exports.login = async (req, res, next) => {

    try {
        // Vérification de la présence de l'email dans la BDD
            const user = await User.findOne({ email : req.body.email})
            
        // Si l'email n'est pas présent je renvoie un code Status 401 :
            if (!user) {
                res.status(401).json( { message : "Authentification impossible"})
            } 
        
        // Si l'email est présent je compare le mdp reçu avec celui de l'utiliseur ciblé:
            const passwordIsValid = bcrypt.compare(req.body.password , user.password);
            
        //Si la comparaison est fausse je renvoie un code status 401
            if (!passwordIsValid) {
                res.status(401).json( { message : "Authentification impossible"})
            }
        
        // Si la comparaison est vraie, je renvoie un code status 201 accompagné d'un TOKEN
            res.status(200).json({
                userId : user._id,
                token : jsonWebToken.sign(
                    {userId: user._Id},
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h'}
                )
            })

    } catch (error) {
        res.status(500).json( error )
    }
};