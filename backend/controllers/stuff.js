// import le model
const Sauce = require('../models/Sauce');
const fs = require('fs');

//exports les controlers
exports.createSauce = (req, res, next) => {
    //exrait l'objet
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        //title: req.body.title, etc... ou 
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked:"",
        usersDisliked: ""

    });
    // méthode save qui enregostre le Thing dans la base de donné
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré' }))
        .catch(error => res.status(400).json({ error }));
};

// met a jour avec modif
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
            ...req.body
        };

    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteSauce = (req, res, next) => {
    //on trouve dans la base de donnée
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // on extrait le nom
            const filename = sauce.imageUrl.split('/images/')[1];
            //on supprime
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'objet supprimé' }))
                .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
}

// permet de chercher et afficher qu'un objet de manière dynamique en trouvant le Thing unique ayant le même _id que le paramètre de la requête
exports.selectOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            res.status(200).json(sauce);
        })
        .catch(error => res.status(400).json({ error }));
}

exports.selectAll = (req, res, next) => {
    // méthode find du modele mongoose qui renvoi un tableau avc tout les Things de la base de donnée
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}

exports.likeSauce = (req, res, next) => {  
    //met a jour le like dans bdd
    const sauceObject = req.body;
    console.log(sauceObject);

    //status j'aime pour l'userId

    //si like = 1 
        // userId like sauce
        // rajoute userId à la liste usersLiked
        // supprime l'userId de la liste usersDisliked s'il existe

    if (req.body.like == 1) {

    }


    // si like = 0 
        // annule le like/dislike
        // supprime l'userId de tout les listes
    // si like = -1
        // userId dislike sauce
        // rajoute userId à la liste de usersDisliked 
        // supprime l'userId de la liste usersLiked s'il existe

    
    
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => {
        res.status(200).json({ message: 'Objet liké' })
    })
    .catch(error => res.status(400).json({ error }));

}


// ajoute un like
// ajoute l'utilisateur qui a liké
