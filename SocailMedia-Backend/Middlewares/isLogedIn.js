/** @format */

import { decodeJwt } from "../Utiliies/jwtUtil.js";
import userModel from "../Models/userModel.js";

export const isLogedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next(new Error("login first to access this page"));
    }

    const decoded = await decodeJwt(token);

    req.user = await userModel.findById(decoded.id);
    next();
  } catch (err) {
    console.log(err);
  }
};
