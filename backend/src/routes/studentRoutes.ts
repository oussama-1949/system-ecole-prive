const express = require('express');
const router = express.Router();
const Student = require('../models/students');

router.post('/students', async (req: any, res: any) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      nationality,
      photo,
      email,
      phone,
      address,
      city,
      postalCode,
      studentID,
      grade,
      enrollmentDate,
      monthlyFee,
      parentName,
      parentPhone,
      parentEmail,
      relationship
    } = req.body;

    // Créer un nouvel élève
    const newStudent = new Student({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      nationality,
      photo,
      email,
      phone,
      address,
      city,
      postalCode,
      studentID,
      grade,
      enrollmentDate,
      monthlyFee,
      parentName,
      parentPhone,
      parentEmail,
      relationship
    });

    await newStudent.save();

    res.status(201).json({ message: 'Élève ajouté avec succès ✅', student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l’ajout de l’élève ❌', error });
  }
});

module.exports = router;
