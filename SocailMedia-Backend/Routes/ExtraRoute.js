/** @format */

import express from "express";
import { myroute } from "../Controllers/ExtraController.js";

const router = express.Router();

router.route("/chalja").get(myroute);

export default router;
