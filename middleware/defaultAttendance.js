//Step2:Attendance

import { Attendance } from "../models/Attendance.js";
import { Employee } from "../models/Employee.js";

export const defaultAttendance = async (req, res, next) => {
  try {
    const date = new Date().toISOString().split("T")[0]; //Format "YYYY-MM_DDThh:mm:ss.sss2 -> "YYYY-MM-DD" "

    const existingAttendance = await Attendance.findOne({ date });

    if (!existingAttendance) {
      const employees = await Employee.find({});

      const attendance = employees.map((employee) => ({
        date,
        employeeId: employee._id,
        status: null,
      }));

      await Attendance.insertMany(attendance);
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "default Attendance Error" });
  }
};
