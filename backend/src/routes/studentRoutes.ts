import express from 'express';
import { addStudent, getStudents , getStudentByStudentID , deleteStudentByStudentID , updateStudentByStudentID } from '../controllers/studentController';

const router = express.Router();

router.post('/students', addStudent);
router.get('/students', getStudents);
router.get('/students/:studentID', getStudentByStudentID);
router.delete('/students/:studentID', deleteStudentByStudentID); 
router.put('/students/:studentID', updateStudentByStudentID); 



export default router;
