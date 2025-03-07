import express from "express";

//Step3: To create a Routes for Salary
import { verifyUser } from "../middleware/authMidlleware.js";
import { ChangePassword } from "../controllers/ChangePasswordController.js";

const router = express();

//step3: for part 3 Add a routes for deparment and authmiddleware

router.put("/change-password", verifyUser, ChangePassword);

export default router;
