const express = require('express'); // création express 
const router = express.Router(); // création d'un routeur express

// Réimplémenter nos logiques métiers, Pour cela nous devons importer notre controleur puis enregistrer les fonction

const auth = require('../middleware/auth'); // nous importons notre middleware et le passons comme argument aux routes à protéger :
const multer = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/sauces');



// creation des routes de post des sauces modifier get et supprimer sauces
router.post("/", auth, multer, saucesCtrl.createSauce);
router.put("/:id", auth, multer, saucesCtrl.modifySauce);
router.delete("/:id", auth, saucesCtrl.deleteSauce);
router.post("/:id/like", auth, saucesCtrl.likeSauce);


router.get("/", auth, saucesCtrl.getAllSauce);
router.get("/:id", auth, saucesCtrl.getOneSauce);


module.exports = router; // exporter router