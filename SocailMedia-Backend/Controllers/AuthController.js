/** @format */

import userModel from "../Models/userModel.js";
import { generateCookie } from "../Utiliies/cookieUtil.js";
import { hashedPass, isValidPass } from "../Utiliies/passUtil.js";

export const registerUser = async (req, res, next) => {
  const { username, password, firstname, lastname } = req.body;

  try {
    let already = await userModel.find({ username: username });
    if (already.length != 0) {
      res.status(500).json({
        success: false,
        msg: "user already registered",
      });
      return;
    }
    if (!password) {
      return next(new Error("password required"));
    }

    const encryptPass = await hashedPass(password);

    const newUser = new userModel({
      username,
      password: encryptPass,
      firstname,
      lastname,
    });

    await newUser.save();
    newUser.password = undefined;
    res.status(200).json({
      success: true,
      newUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username + " " + password);
  try {
    if (!username || !password) {
      return next(new Error("Username and Password needed"));
    }

    const user = await userModel.findOne({ username: username });

    if (!user) {
      return next(new Error("User not found. Plz create the account first"));
    }

    const isvalid = await isValidPass(password, user.password);
    if (!isvalid) {
      return next(new Error("Enter Valid Password"));
    }

    user.password = undefined;

    generateCookie(user, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};
