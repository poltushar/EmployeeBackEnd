import { Attendance } from "../models/Attendance.js";
import { Employee } from "../models/Employee.js";

export const getAttendance = async (req, res) => {
  //employee connection with department and user thats way use populate
  try {
    const date = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.find({ date }).populate({
      path: "employeeId",
      populate: ["department", "userId"],
    });

    return res.status(200).json({ success: true, attendance });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get Attendance Error" });
  }
};

export const updateAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { status } = req.body;
    const date = new Date().toISOString().split("T")[0];
    const employee = await Employee.findOne({ employeeId });
    const attendance = await Attendance.findOneAndUpdate(
      { employeeId: employee._id, date },
      { status },
      { new: true }
    );

    return res.status(200).json({ success: true, attendance });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Update Attendance Error" });
  }
};

export const attendanceReport = async (req, res) => {
  try {
    const { date, limit, skip = 0 } = req.query;
    const query = {};
    if (date) {
      query.date = date;
    }
    const attendanceDate = await Attendance.find(query)
      .populate({
        path: "employeeId",
        populate: ["department", "userId"],
      })
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const groupData = attendanceDate.reduce((result, record) => {
      if (!result[record.date]) {
        result[record.date] = [];
      }
      result[record.date].push({
        employeeId: record.employeeId.employeeId,
        employeeName: record.employeeId.userId.name,
        departmentName: record.employeeId.department.dep_name,
        status: record.status || "Not Marked",
      });

      return result;
    }, {});

    return res.status(200).json({ success: true, groupData });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: " AttendanceReport get  Error" });
  }
};
