/************ Notre modèle utilisateur ****************/

const mongoose = require('mongoose'); // module mongoose

const uniqueValidator = require("mongoose-unique-validator")

/*
 * Dans notre schèma, la valeur unique, avec l'élément mongoose-unique-validator
 * passé comme plug-in, s'assurera qu'aucun des deux utilisateurs ne peut partager la même adresse e-mail
 */

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);