import type { Request, Response, NextFunction } from 'express';
import StudentModel,  { type IStudent } from '../models/students';



export const addStudent = async (req: Request<{}, {}, Partial<IStudent>>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newStudent = new StudentModel(req.body);
    await newStudent.save();
    res.status(201).json({ message: 'Élève ajouté avec succès ✅', student: newStudent });
  } catch (error) {
    next(error);
  }
};

export const getStudents = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const students: IStudent[] = await StudentModel.find();
    res.status(200).json({ students });
  } catch (error) {
    next(error);
  }
};


export const getStudentByStudentID = async (
  req: Request<{ studentID: string }>, 
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { studentID } = req.params;

    // Recherche dans la base de données
    const student: IStudent | null = await StudentModel.findOne({ studentID });

    if (!student) {
      res.status(404).json({ message: 'Élève non trouvé ❌' });
      return;
    }

    res.status(200).json({ student });
  } catch (error) {
    next(error);
  }
};


export const deleteStudentByStudentID = async (
  req: Request<{ studentID: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { studentID } = req.params;

    const deletedStudent: IStudent | null = await StudentModel.findOneAndDelete({ studentID });

    if (!deletedStudent) {
      res.status(404).json({ message: 'Élève non trouvé ❌' });
      return;
    }

    res.status(200).json({ message: 'Élève supprimé ✅', student: deletedStudent });
  } catch (error) {
    next(error);
  }
};

export const updateStudentByStudentID = async (
  req: Request<{ studentID: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { studentID } = req.params;

    // Met à jour l'élève avec les données du body
    const updatedStudent: IStudent | null = await StudentModel.findOneAndUpdate(
      { studentID },
      req.body,
      { new: true } // retourne le document mis à jour
    );

    if (!updatedStudent) {
      res.status(404).json({ message: 'Élève non trouvé ❌' });
      return;
    }

    res.status(200).json({ message: 'Élève mis à jour ✅', student: updatedStudent });
  } catch (error) {
    next(error);
  }
};