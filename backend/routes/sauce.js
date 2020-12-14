const express = require('express');
const router = express.Router();
// importla logique métier
const stuffCtrl = require('../controllers/sauce');
// import la logique d'enthautification qu'on rajoute sur les router
const auth = require('../middleware/auth');
// gère les fichiers entrant 
const multer = require('../middleware/multer-config');

// ROUTE Post : ajoute un stuff
router.post('/', auth, multer, stuffCtrl.createSauce);
// route put (modifier)
router.put('/:id', auth, multer, stuffCtrl.modifySauce);
// route supprimer
router.delete('/:id', auth, stuffCtrl.deleteSauce);
//route get   ( /:id dis a express que ctte apertie est dynamique) donne accès à "req.params.id"
router.get('/:id', auth, stuffCtrl.selectOneSauce);
// ROUTE GET - affiche tout les modèles
router.get('/'+'', auth, stuffCtrl.selectAll);
// route ajoute un like
router.post('/:id/like', auth, stuffCtrl.likeSauce);

module.exports = router;