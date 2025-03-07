//Step2:Create a Scheme For Model

import mongoose, { Schema } from "mongoose";

const employeeSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  employeeId: { type: String, required: true, unique: true },
  dob: { type: Date },
  gender: { type: String },
  maritalStatus: { type: String },
  designation: { type: String },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  Salary: { type: Number, required: true },
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Employee = mongoose.model("Employee", employeeSchema);
