import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IPayment extends Document {
    studentRef: mongoose.Types.ObjectId;  // Référence vers Student
    amount: number ;
    month : string ;
    status: "Payé" | "En attente" | "En retard";  
    paymentDate?: Date;   
    createdAt?: Date;   

}

const PaymentSchema: Schema = new Schema({
  studentRef: { type: Schema.Types.ObjectId, ref: 'Student', required: true }, // Référence vers Student
  amount: { type: Number, required: true },
  month: { type: String, required: true },
  status: { type: String, enum: ["Payé", "En attente", "En retard"], default: "En attente" },
  paymentDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
}); 

const PaymentModel: Model<IPayment> = mongoose.model<IPayment>('Payment', PaymentSchema);


export default PaymentModel;
