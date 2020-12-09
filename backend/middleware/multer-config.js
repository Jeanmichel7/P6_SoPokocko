const multer = require('multer');

// dictionnaire 
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//objet de config : enregistre sur le disk
const storage = multer.diskStorage({
    // ou enregistrer les fichié
    destination: (req, file, callback) => {
        callback(null,'images');
    },
    // nom de fichier a utiliser
    filename: (req, file, callback) => {
        //nouveau nom = nom origine '_' a la place de espace
        const name = file.originalname.split(' ').join('_');
        // extension = élement du dico avec le mime type du fichier envoyé par le front
        const extension = MIME_TYPES[file.mimetype];
        // créé filenam ( name+date.jpg)
        const nameSansExtension = name.split('.')[0];
        callback(null, nameSansExtension + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('image');
