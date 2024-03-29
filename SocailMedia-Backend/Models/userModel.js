/** @format */

import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    firstname: {
      type: String,
      required: true,
    },

    lastname: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    profilepicture: String,
    coverPicture: String,
    about: String,
    livesin: String,
    worksAt: String,
    relationship: String,
    followers: [],
    following: [],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
