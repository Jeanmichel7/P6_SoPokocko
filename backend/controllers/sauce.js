// import le model
const Sauce = require('../models/Sauce');
const User = require('../models/User');
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
        likes:0,
        dislikes:0
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
    // on récupère la recette
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (req.body.like === 1) {
                // si l'user est déja dans la liste des likes
                if (sauce.usersLiked.includes(req.body.userId)) {
                    console.log("il est déja dans la liste des likes")
                } else {
                    sauce.likes ++;
                    sauce.usersLiked.push(req.body.userId);
                    sauce.usersDisliked.remove(req.body.userId);
                }
            }
            else if (req.body.like === -1) {
                // si l'utilisateur est déja dans la liste des lislike
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    console.log("déja dans lislike")
                }
                else {
                    sauce.dislikes ++;
                    sauce.usersDisliked.push(req.body.userId);
                    sauce.usersLiked.remove(req.body.userId);
                }                      
            }
            else if (req.body.like === 0){
                // si 
                if (sauce.usersLiked.includes(req.body.userId)) { 
                    sauce.likes --;
                    sauce.usersLiked.remove(req.body.userId);
                } 
                // si l'user est dans les dislike
                else if (sauce.usersDisliked.includes(req.body.userId)) {
                    sauce.dislikes --;
                    sauce.usersDisliked.remove(req.body.userId);
                }
            }
            //met a jour le like dans la bdd 
            sauce.save()
                .then(() => {
                    res.status(200).json({ message: 'Objet liké' })
                })
                .catch(error => res.status(400).json({ error }))
        }).catch(error => res.status(500).json({ error }));
    };