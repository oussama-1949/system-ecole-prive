import express from 'express';
import {addPayment , getPayments , getPaymentsByStudentID, updatePayment } from '../controllers/paymentController'

const router = express.Router();

router.post('/payments' , addPayment );
router.get('/payments' , getPayments)
router.get('/payments/:studentID' , getPaymentsByStudentID );


export default router;
