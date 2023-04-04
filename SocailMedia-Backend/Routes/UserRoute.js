/** @format */

import express from "express";
import {
  followUser,
  getUser,
  unfollowUser,
  updateInfo,
} from "../Controllers/UserController.js";
import { isLogedIn } from "../Middlewares/isLogedIn.js";

const router = express.Router();

router.get("/:id", getUser);
router.put("/updateinfo", isLogedIn, updateInfo);
router.put("/followuser/:id", isLogedIn, followUser);
router.put("/unfollowuser/:id", isLogedIn, unfollowUser);

export default router;
