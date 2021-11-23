/***************** Variables ******************/
const Sauce = require('../models/sauce');

/**
 * Package système de fichiers, nous donne accès aux fonctions qui nous permettent de modifier le système de fichiers
 * y compris aux fonctions permettant de supprimer les fichiers.
 */
const fs = require('fs');

/****************** Logique métier des routeurs des sauces sur les differentes routes **********************/

// AFFICHER TOUTES LES SAUCES
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({ error }));
};
// AFFICHER UNE SEULE SAUCE
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error }));
};

// Exposons la logique de notre route POST en tant que fonction appelée "createSauce" : CRÉER UNE SAUCE
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0
    });
    sauce
        .save()
        .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
        .catch((error) => res.status(400).json({ error }));
};

// MODIFIER UNE SAUCE
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
    } : {...req.body };
    Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
        .catch((error) => res.status(400).json({ error }));
};
// SUPPRIMER UNE SAUCE
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const filename = sauce.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
                    .catch((error) => res.status(400).json({ error }));
            });
        })
        .catch((error) => res.status(500).json({ error }));
};

//  LIKE / DISLIKE UNE SAUCE
exports.likeSauce = (req, res, next) => {
    console.log({ _id: req.params.id });
    console.log({ likes: req.body.like });
    console.log({ usersLiked: req.body.userId });

    const sauceObject = req.body;
    console.log(sauceObject);

    if (sauceObject.like === 1) {
        Sauce.updateOne({ _id: req.params.id }, {
                $inc: { likes: +1 },
                $push: { usersLiked: req.body.userId },
            })
            .then(() => res.status(200).json({ message: "un like en plus !" }))
            .catch((error) => res.status(400).json({ error }));
    } else if (sauceObject.like === -1) {
        Sauce.updateOne({ _id: req.params.id }, {
                $inc: { dislikes: +1 },
                $push: { usersDisliked: req.body.userId },
            })
            .then(() => res.status(200).json({ message: "un dislike en plus !" }))
            .catch((error) => res.status(400).json({ error }));
    } else {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                console.log(sauce);
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id }, {
                            $pull: { usersLiked: req.body.userId },
                            $inc: { likes: -1 },
                        })
                        .then(() => res.status(200).json({ message: "enlève le like !" }))
                        .catch((error) => res.status(400).json({ error }));
                } else if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id }, {
                            $pull: { usersDisliked: req.body.userId },
                            $inc: { dislikes: -1 },
                        })
                        .then(() =>
                            res.status(200).json({ message: "enlève le dislike !" })
                        )
                        .catch((error) => res.status(400).json({ error }));
                }
            })
            .catch((error) => res.status(400).json({ error }));
    }
};