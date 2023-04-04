/** @format */

import userModel from "../Models/userModel.js";
import { hashedPass } from "../Utiliies/passUtil.js";

export const getUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await userModel.findById(id);
    if (user) {
      user.password = undefined;

      res.status(200).json({
        success: true,
        user,
      });
    } else {
      return next(new Error("User not found"));
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

export const updateInfo = async (req, res, next) => {
  const userId = req.user._id;

  try {
    if (req.body.password) {
      const encrpytPass = await hashedPass(req.body.password);
      req.body.password = encrpytPass;
    }

    const user = await userModel.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    user.password = undefined;
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    req.status(500).json({
      success: false,
      error: err,
    });
  }
};

// DELETE USER
// export const deleteUser = (req, res, next) =>{

// }

export const followUser = async (req, res, next) => {
  try {
    const otherUser = req.params.id;
    const User = req.user._id;

    if (User === otherUser) {
      return next(new Error("Action Restricted"));
    }

    const followUser = await userModel.findById(otherUser);
    const followingUser = await userModel.findById(User);

    if (!followUser.followers.includes(User)) {
      //   followUser.followers.push(User);
      //   await followUser.save();

      await followUser.updateOne({ $push: { followers: User } });
      await followingUser.updateOne({ $push: { following: followUser._id } });

      res.status(200).json({
        success: true,
        msg: "You are now following the User",
      });
    } else {
      res.status(200).json({
        success: true,
        msg: "User is Already followed by you",
      });
    }
  } catch (err) {}
};

export const unfollowUser = async (req, res, next) => {
  try {
    const otherUser = req.params.id;
    const User = req.user._id;

    if (User === otherUser) {
      return next(new Error("Action Restricted"));
    }

    const unfollowUser = await userModel.findById(otherUser);
    const unfollowingUser = await userModel.findById(User);

    if (unfollowUser.followers.includes(User)) {
      //   followUser.followers.push(User);
      //   await followUser.save();

      await unfollowUser.updateOne({ $pull: { followers: User } });
      await unfollowingUser.updateOne({
        $pull: { following: unfollowUser._id },
      });

      res.status(200).json({
        success: true,
        msg: "You are now  not following the User",
      });
    } else {
      res.status(200).json({
        success: true,
        msg: "User is Already not following the user",
      });
    }
  } catch (err) {}
};
