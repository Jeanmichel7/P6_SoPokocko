//importe package jsonwebtoken
const jwt = require('jsonwebtoken');

// exporte le middleware
module.exports = (req, res, next) => {
    try{
        // récupère le token via le header
        const token = req.headers.authorization.split(' ')[1];
        // verifie token = clé secrete -> devien objet JS
        const decodedToken= jwt.verify(token, 'tBNq9krgFiK0aR6U61C4vv5MqzHmnDZm');
        // récupère l'userId
        const userId = decodedToken.userId;
        //si l'userId correspond à la requete du token
        if ( req.body.userId && req.body.userId !== userId) {
            throw 'User id non valable !';
        } else {
            next();
        }
    }
    catch(error){
        res.status(401).json({error: error && 'Requete non authentifié!'});
    }
};