// import le model
const Thing = require('../models/Thing');

const fs = require('fs');
//exports les controlers
exports.createThing = (req, res, next) => {
    //exrait l'objet
    const thingObject = JSON.parse(req.body.sauce);
    delete thingObject._id;
    console.log(req.file.filename);
    const sauce = new Thing({
        //title: req.body.title, etc... ou 
        ...thingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log(sauce);
    // méthode save qui enregostre le Thing dans la base de donné
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré' }))
        .catch(error => res.status(400).json({ error }));
};

// met a jour avec modif
exports.modifieStuff = (req, res, next) => {
    const thingObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
            ...req.body
        };

    Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteStuff = (req, res, next) => {
    //on trouve dans la base de donnée
    Thing.findOne({ _id: req.params.id })
        .then(thing => {
            // on extrait le nom
            const filename = thing.imageUrl.split('/images/')[1];
            //on supprime
            fs.unlink(`images/${filename}`, () => {
                Thing.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'objet supprimé' }))
                .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
}

// permet de chercher et afficher qu'un objet de manière dynamique en trouvant le Thing unique ayant le même _id que le paramètre de la requête
exports.selectOneStuff = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(400).json({ error }));
}

exports.selectAll = (req, res, next) => {
    // méthode find du modele mongoose qui renvoi un tableau avc tout les Things de la base de donnée
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
}