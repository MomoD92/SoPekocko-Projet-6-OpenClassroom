/**************************** variables de stockage module npm ***************/
const express = require('express'); //import du framework express JS
const bodyParser = require('body-parser'); // le package body-parser pour être capables d'extraire l'objet JSON de la demande
const mongoose = require('mongoose'); //Mongoose est un package qui facilite les interactions avec notre base de données MongoDB grâce à des fonctions extrêmement utiles
const Sauce = require('./models/sauce'); // Pour pouvoir utiliser notre nouveau modèle Mongoose dans l'application, nous devons l'importer dans le fichier app.js :


/*************************** variables de stockage des routes ************************************************/
const saucesRoutes = require('./routes/sauces'); // import de notre routeur dans app.js
const userRoutes = require('./routes/user'); // import de notre routeur dans app.js

// appel de "express" 
const app = express(); // création de l'application express

// une nouvelle importation dans app.js pour accéder au path de notre serveur
const path = require('path');

// Connexion à la base de données MongoDB
mongoose.connect("mongodb+srv://MauriceDiouf:mariane2007@cluster0.aqfga.mongodb.net/Deployments?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


/******************************** Middleware **************************/
// Configuration cors: système de sécurité
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// la fonction json de bodyParser comme middleware global
app.use(bodyParser.json());

//indique à Express qu'il faut gérer la ressource images de manière statique (un sous-répertoire de notre répertoire de base, __dirname ) à chaque fois qu'elle reçoit une requête vers la route /images
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes); // enregistrer notre routeur pour toutes les demandes effectuées vers /api/sauces
app.use('/api/auth', userRoutes); // enregistrement de notre routeur dans l'application


module.exports = app;