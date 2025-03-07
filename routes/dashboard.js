import express from "express";

import { verifyUser } from "../middleware/authMidlleware.js";
import { getSummary } from "../controllers/dashBoardController.js";

const router = express.Router();

router.get("/summary", verifyUser, getSummary);

export default router;
