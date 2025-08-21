import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface IClass extends Document {
  name: string;                        // Nom de la classe (ex: "Terminale S")
  monthlyFee?: number;                 // Frais mensuels par défaut pour la classe
  teacher?: Types.ObjectId;            // Référence vers l'enseignant responsable
  students?: Types.ObjectId[];         // Optionnel : tableau des étudiants de cette classe
  createdAt?: Date;
  updatedAt?: Date;
}

const ClassSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    monthlyFee: { type: Number, default: 0 },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
  },
  { timestamps: true }
);

const ClassModel: Model<IClass> = mongoose.model<IClass>('Class', ClassSchema);

export default ClassModel;
