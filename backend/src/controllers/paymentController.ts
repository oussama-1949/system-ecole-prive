import type { Request, Response, NextFunction } from 'express';
import PaymentModel, { IPayment } from '../models/payments';
import StudentModel from '../models/students';
import mongoose from 'mongoose';

// Interface pour le body de création d’un paiement
interface AddPaymentBody extends Partial<IPayment> {
  studentID: string; // Obligatoire côté client
}

// CREATE
export const addPayment = async (
  req: Request<{}, {}, AddPaymentBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { studentID, amount, month, status, paymentDate } = req.body;

    const student = await StudentModel.findOne({ studentID }).lean();
    if (!student) {
      res.status(404).json({ message: 'Étudiant non trouvé ❌' });
      return;
    }

    const newPayment = await PaymentModel.create({
      studentRef: student._id,
      amount,
      month,
      status: status ?? "En attente",
      paymentDate
    });

    res.status(201).json({ message: 'Paiement ajouté ✅', payment: newPayment });
  } catch (error) {
    next(error);
  }
};

// READ ALL
export const getPayments = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const payments = await PaymentModel.find().populate('studentRef', 'studentID firstName lastName');
    res.status(200).json({ payments });
  } catch (error) {
    next(error);
  }
};

// READ BY STUDENT ID
export const getPaymentsByStudentID = async (
  req: Request<{ studentID: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { studentID } = req.params;
    const student = await StudentModel.findOne({ studentID }).lean();
    if (!student) {
      res.status(404).json({ message: 'Étudiant non trouvé ❌' });
      return;
    }

    const payments = await PaymentModel.find({ studentRef: student._id});
    res.status(200).json({ payments });
  } catch (error) {
    next(error);
  }
};

// UPDATE
export const updatePayment = async (
  req: Request<{ paymentID: string }, {}, Partial<IPayment>>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { paymentID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(paymentID)) {
      res.status(400).json({ message: "ID de paiement invalide ❌" });
      return;
    }

    const updatedPayment = await PaymentModel.findByIdAndUpdate(
      paymentID,
      req.body,
      { new: true }
    );

    if (!updatedPayment) {
      res.status(404).json({ message: 'Paiement non trouvé ❌' });
      return;
    }

    res.status(200).json({ message: 'Paiement mis à jour ✅', payment: updatedPayment });
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deletePayment = async (
  req: Request<{ paymentID: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { paymentID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(paymentID)) {
      res.status(400).json({ message: "ID de paiement invalide ❌" });
      return;
    }

    const deletedPayment = await PaymentModel.findByIdAndDelete(paymentID);

    if (!deletedPayment) {
      res.status(404).json({ message: 'Paiement non trouvé ❌' });
      return;
    }

    res.status(200).json({ message: 'Paiement supprimé ✅', payment: deletedPayment });
  } catch (error) {
    next(error);
  }
};
