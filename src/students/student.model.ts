import * as mongoose from 'mongoose';

export const StudentSchema = new mongoose.Schema({  // định nghĩa schema 
  code: { type: String, required: true },
  name: { type: String, required: true }, 
  age: { type: Number, required: true },
  gender: { type :Boolean, required: true},
  
});

export interface Student extends mongoose.Document {// save,remove...
  id: string;
  code: string;
  name: string;
  age: number;
  gender: boolean;
}