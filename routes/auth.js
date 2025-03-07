import express from "express";
import { verify, login } from "../controllers/authController.js";
import { verifyUser } from "../middleware/authMidlleware.js";

const router = express.Router();
//first
router.post("/login", login);
//second this a access data by middleware

router.get("/verify", verifyUser, verify);
export default router;
