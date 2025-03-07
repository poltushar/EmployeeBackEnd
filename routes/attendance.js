import express from "express";

import { verifyUser } from "../middleware/authMidlleware.js";
import {
  attendanceReport,
  getAttendance,
  updateAttendance,
} from "../controllers/Attendance.js";
import { defaultAttendance } from "../middleware/defaultAttendance.js";

const router = express.Router();

router.get("/", verifyUser, defaultAttendance, getAttendance);

router.put(
  "/update/:employeeId",
  verifyUser,
  defaultAttendance,
  updateAttendance
);

router.get("/report", verifyUser, defaultAttendance, attendanceReport);

export default router;
