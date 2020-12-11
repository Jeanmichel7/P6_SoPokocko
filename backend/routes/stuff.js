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
// route ajoute un like
router.post('/:id/like', auth, stuffCtrl.likeSauce);
router.post('/:id/like', auth, stuffCtrl.dislikeSauce);

module.exports = router;
