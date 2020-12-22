const express = require('express');
const router = express.Router();
// importla logique métier
const sauceCtrl = require('../controllers/sauce');
// import la logique d'enthautification qu'on rajoute sur les router
const auth = require('../middleware/auth');
// gère les fichiers entrant 
const multer = require('../middleware/multer-config');

// ROUTE Post : ajoute un sauce
router.post('/', auth, multer, sauceCtrl.createSauce);
// route put (modifier)
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// route supprimer
router.delete('/:id', auth, sauceCtrl.deleteSauce);
//route get   ( /:id dis a express que ctte apertie est dynamique) donne accès à "req.params.id"
router.get('/:id', auth, sauceCtrl.selectOneSauce);
// ROUTE GET - affiche tout les modèles
router.get('/'+'', auth, sauceCtrl.selectAll);
// route ajoute un like
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;