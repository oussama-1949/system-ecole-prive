import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IStudent extends Document {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: "Homme" | "Femme";
  nationality?: string;
  photo?: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
  studentID: string;
  grade: "1ere annee" | "2ere annee" | "3ere annee" | "4ere annee" | "5ere annee" | "6ere annee";
  enrollmentDate?: Date;
  monthlyFee: number;
  parentName?: string;
  parentPhone?: string;
  parentEmail?: string;
  relationship?: string;
  createdAt?: Date;
}

const StudentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ["Homme", "Femme"], required: true },
  nationality: { type: String },
  photo: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  postalCode: { type: String },
  studentID: { type: String, required: true, unique: true },
  grade: { 
    type: String, 
    enum: ["1ere annee","2ere annee","3ere annee","4ere annee","5ere annee","6ere annee"],
    required: true
  },
  enrollmentDate: { type: Date, default: Date.now },
  monthlyFee: { type: Number, required: true },
  parentName: { type: String },
  parentPhone: { type: String },
  parentEmail: { type: String },
  relationship: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const StudentModel: Model<IStudent> = mongoose.model<IStudent>('Student', StudentSchema);

export default StudentModel;
