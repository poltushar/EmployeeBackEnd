import express from "express";

//Step3: To create a Routes for Salary
import { verifyUser } from "../middleware/authMidlleware.js";
import { addSalary, getSalary } from "../controllers/salaryController.js";

const router = express();

//step3: for part 3 Add a routes for deparment and authmiddleware

router.post("/add", verifyUser, addSalary);

router.get("/:id/:role", verifyUser, getSalary);
export default router;
