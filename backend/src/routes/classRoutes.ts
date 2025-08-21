import express from 'express';
import { 
  addClass, 
  getClasses, 
  getClassByID, 
  updateClass, 
  deleteClass, 
  getAllStudentsByClass
} from '../controllers/classController';

const router = express.Router();

// CRUD pour les classes
router.post('/classes', addClass);               // Ajouter une classe
router.get('/classes', getClasses);             // Récupérer toutes les classes
router.get('/classes/:classID', getClassByID);  // Récupérer une classe par ID
router.get('/classes/:classID/students',getAllStudentsByClass)

router.put('/classes/:classID', updateClass);   // Mettre à jour une classe
router.delete('/classes/:classID', deleteClass);// Supprimer une classe

export default router;
