const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  // Informations personnelles
  firstName: { type: String, required: true },        // Prénom
  lastName: { type: String, required: true },         // Nom
  dateOfBirth: { type: Date, required: true },       // Date de naissance
  gender: { type: String, enum: ["Homme", "Femme"] }, // Sexe
  nationality: { type: String },                     // Nationalité
  photo: { type: String },                            // Photo de l'élève (URL ou path)

  // Coordonnées
  email: { type: String, required: true, unique: true }, // Email unique
  phone: { type: String, required: true },              // Téléphone
  address: { type: String },                            // Adresse
  city: { type: String },                               // Ville
  postalCode: { type: String },                         // Code postal

// Informations académiques (Primaire, système marocain)
studentID: { type: String, required: true, unique: true }, // ID unique
grade: { 
  type: String, 
  enum: [
    "1ere annee", 
    "2ere annee", 
    "3ere annee", 
    "4ere annee", 
    "5ere annee", 
    "6ere annee"
  ], 
  required: true 
},

// Classe / niveau primaire
enrollmentDate: { type: Date, default: Date.now }, // Date d'inscription
monthlyFee: { type: Number, required: true }  ,      // Frais mensuels

  // Informations parents / tuteurs
  parentName: { type: String },    // Nom du parent ou tuteur
  parentPhone: { type: String },   // Téléphone du parent
  parentEmail: { type: String },   // Email du parent
  relationship: { type: String },  // Relation (Père, Mère, Tuteur)

  // Date de création
  createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;