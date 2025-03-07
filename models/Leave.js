//step1:Create a Schema

import mongoose, { Schema } from "mongoose";

const LeaveSchema = mongoose.Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  leaveType: {
    type: String,
    enum: ["Sick Leave", "Casual Leave", "Annual Leave"],
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },

  reason: { type: String, required: true },
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Leave = mongoose.model("Leave", LeaveSchema);

export default Leave;
