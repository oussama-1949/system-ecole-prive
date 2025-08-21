import express from 'express';
import {addPayment , getPayments , getPaymentsByStudentID, updatePayment , deletePayment } from '../controllers/paymentController'

const router = express.Router();

router.post('/payments' , addPayment );
router.get('/payments' , getPayments)
router.get('/payments/:studentID' , getPaymentsByStudentID );
router.put('/payments/:paymentID' , updatePayment );
router.delete('/payments/:paymentID' , deletePayment );




export default router;
