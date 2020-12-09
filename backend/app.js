// import express
const express = require('express');
//import body-parser
const bodyParser = require('body-parser');
//import mongoose
const mongoose = require('mongoose');
//notre application appelle express
const app = express();
//chemin du systeme de fichier
const path = require('path');
console.log(path);

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

//connect au cluster - base de donnée
mongoose.connect('mongodb+srv://nonx:jmr@cluster0.fde6e.mongodb.net/<dbname>?retryWrites=true&w=majority',
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

// transforme le corp de la requete en un objet js
app.use(bodyParser.json());
//sers un dossier static (chemin : )
app.use('/images', express.static(path.join(__dirname, 'images')));
//Route Thing
app.use('/api/sauces', stuffRoutes);
//Route user
app.use('/api/auth', userRoutes);

//exporter cette application pour etre asccessible depuis servernode
module.exports = app;