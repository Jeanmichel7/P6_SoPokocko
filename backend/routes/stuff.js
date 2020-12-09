const express = require('express');
const router = express.Router();
// importla logique métier
const stuffCtrl = require('../controllers/stuff');
// import la logique d'enthautification qu'on rajoute sur les router
const auth = require('../middleware/auth');
// gère les fichiers entrant 
const multer = require('../middleware/multer-config');

// ROUTE Post : ajoute un stuff
router.post('/', auth, multer, stuffCtrl.createThing);
// route put (modifier)
router.put('/:id', auth, multer, stuffCtrl.modifieStuff);
// route supprimer
router.delete('/:id', auth, stuffCtrl.deleteStuff);
//route get   ( /:id dis a express que ctte apertie est dynamique) donne accès à "req.params.id"
router.get('/:id', auth, stuffCtrl.selectOneStuff);
// ROUTE GET - affiche tout les modèles
router.get('/'+'', auth, stuffCtrl.selectAll);

module.exports = router;




//configure la reponse générale - middleware
//router.use('/api/stuff', (req, res, next) => {
    //const stuff = [
    //    {
    //        _id: 'oeihfzeoi',
    //        title: 'Mon premier objet',
    //        description: 'Les infos de mon premier objet',
    //        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
    //        price: 4900,
    //        userId: 'qsomihvqios',
    //    },
    //    {
    //        _id: 'oeihfzeomoihi',
    //        title: 'Mon deuxième objet',
    //        description: 'Les infos de mon deuxième objet',
    //        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
    //        price: 2900,
    //        userId: 'qsomihvqios',
    //    },
    //];
    //res.status(200).json(stuff);