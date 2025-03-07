import express from "express";

import { verifyUser } from "../middleware/authMidlleware.js";
import {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
} from "../controllers/employeeController.js";

const router = express();

//Step 4: Add controller file in router

router.get("/", verifyUser, getEmployees);
router.post("/add", verifyUser, upload.single("image"), addEmployee);

router.get("/:id", verifyUser, getEmployee);
router.put("/:id", verifyUser, updateEmployee);

// router.put("/:id", verifyUser, updateDepartment);
router.get("/department/:id", verifyUser, fetchEmployeesByDepId);

export default router;
