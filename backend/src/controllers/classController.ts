import type { Request, Response, NextFunction } from 'express';
import ClassModel, { IClass } from '../models/classes';
import StudentModel, { IStudent } from '../models/students';

import mongoose from 'mongoose';

interface AddClassBody extends Partial<IClass> {
  name: string;  // Obligatoire
}



// CREATE
export const addClass = async (
  req: Request<{}, {}, AddClassBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, monthlyFee, teacher } = req.body;

    if (!name ) {
      res.status(400).json({ message: 'Nom et niveau de la classe obligatoires ❌' });
      return;
    }

    const newClass = await ClassModel.create({
      name,
      monthlyFee: monthlyFee ?? 0,
      teacher
    });

    res.status(201).json({ message: 'Classe ajoutée ✅', class: newClass });
  } catch (error) {
    next(error);
  }
};

// READ ALL
export const getClasses = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const classes = await ClassModel.find();
    res.status(200).json({ classes });
  } catch (error) {
    next(error);
  }
};

// READ ONE
export const getClassByID = async (
  req: Request<{ classID: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { classID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(classID)) {
      res.status(400).json({ message: 'ID de classe invalide ❌' });
      return;
    }

    const classItem = await ClassModel.findById(classID);
    if (!classItem) {
      res.status(404).json({ message: 'Classe non trouvée ❌' });
      return;
    }

    res.status(200).json({ class: classItem });
  } catch (error) {
    next(error);
  }
};

// UPDATE
export const updateClass = async (
  req: Request<{ classID: string }, {}, Partial<IClass>>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { classID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(classID)) {
      res.status(400).json({ message: 'ID de classe invalide ❌' });
      return;
    }

    const updatedClass = await ClassModel.findByIdAndUpdate(classID, req.body, { new: true });
    if (!updatedClass) {
      res.status(404).json({ message: 'Classe non trouvée ❌' });
      return;
    }

    res.status(200).json({ message: 'Classe mise à jour ✅', class: updatedClass });
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteClass = async (
  req: Request<{ classID: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { classID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(classID)) {
      res.status(400).json({ message: 'ID de classe invalide ❌' });
      return;
    }

    const deletedClass = await ClassModel.findByIdAndDelete(classID);
    if (!deletedClass) {
      res.status(404).json({ message: 'Classe non trouvée ❌' });
      return;
    }

    res.status(200).json({ message: 'Classe supprimée ✅', class: deletedClass });
  } catch (error) {
    next(error);
  }
};


// GET ALL STUDENTS BY CLASS
export const getAllStudentsByClass = async (
  req: Request<{ classID: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { classID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(classID)) {
      res.status(400).json({ message: 'ID de classe invalide ❌' });
      return;
    }

    // Vérifier que la classe existe
    const classItem = await ClassModel.findById(classID).lean();
    if (!classItem) {
      res.status(404).json({ message: 'Classe non trouvée ❌' });
      return;
    }

    // Récupérer tous les étudiants de cette classe
    const students: IStudent[] = await StudentModel.find({ classRef: classID }).lean();

    res.status(200).json({
      class: {
        ...classItem,
        students
      }
    });
  } catch (error) {
    next(error);
  }
};
