/** @format */

import express from "express";
import { login, registerUser } from "../Controllers/AuthController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

export default router;
