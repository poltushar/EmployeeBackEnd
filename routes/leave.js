import express from "express";

//Step3: To create a Routes for leave
import { verifyUser } from "../middleware/authMidlleware.js";
import {
  addLeave,
  getLeave,
  getLeaves,
  getLeaveDatail,
  updateLeave,
} from "../controllers/leaveController.js";

const router = express();

router.post("/add", verifyUser, addLeave);
router.get("/detail/:id", verifyUser, getLeaveDatail);
router.get("/:id/:role", verifyUser, getLeave);
router.get("/", verifyUser, getLeaves);
router.put("/:id", verifyUser, updateLeave);

export default router;
