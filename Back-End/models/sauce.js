// Mongoose est un package qui facilite les interactions avec notre base de données MongoDB grâce à des fonctions extrêmement utiles
const mongoose = require('mongoose');

/*************************** Le modèle de données pour une sauce ***************************************/
// On utilise la méthode Schema mise à disposition par Mongoose
// Pas besoin de mettre un champ pour l'Id car il est automatiquement généré par mongoose

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true }, // identifiant unique MongoDB pour l'utilisateur qui a créé la sauce
    name: { type: String, required: true }, // nom de la sauce
    manufacturer: { type: String, required: true }, // fabricant de la sauce;
    description: { type: String, required: true }, // description de la sauce
    mainPepper: { type: String, required: true }, // principal ingrédient dans la sauce
    imageUrl: { type: String, required: true }, // string de l'image de la sauce téléchargée par l'utilisateur
    heat: { type: Number, required: true }, // nombre entre 1 et 10 décrivant la sauce
    likes: { type: Number, required: true }, // nombre d'utilisateurs qui aiment la sauce
    dislikes: { type: Number, required: true }, // nombre d'utilisateurs qui n'aiment pas la sauce
    usersLiked: { type: Array, required: true }, // tableau d'identifiant d'utilisateurs ayant aimé la sa
    usersDisliked: { type: Array, required: true } // tableau d'identifiants d'utilisateurs n'ayant pas aimé la sauce
});

// Nous exportons ce schèma en tant que modèle Mongoose appelé << sauce >>
//  le rendant par la même disponible pour notre application Express
module.exports = mongoose.model('Sauce', sauceSchema);