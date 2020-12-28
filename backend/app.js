// import express
const express = require('express');
//import body-parser
const helmet = require("helmet");

const bodyParser = require('body-parser');
//import mongoose
const mongoose = require('mongoose');
//notre application appelle express
const app = express();
//chemin du systeme de fichier
const path = require('path');
console.log(path);
require('dotenv').config();

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//connect au cluster - base de donnée
mongoose.connect(process.env.DB_URL,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//rajoute entete a l'objet response qu'on renvoi au navigateur - CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//securisation des headers
app.use(helmet());
// transforme le corp de la requete en un objet js
app.use(bodyParser.json());
//sers un dossier static (chemin : )
app.use('/images', express.static(path.join(__dirname, 'images')));
//Route sauce
app.use('/api/sauces', sauceRoutes);
//Route user
app.use('/api/auth', userRoutes);

//exporter cette application pour etre asccessible depuis servernode
module.exports = app;