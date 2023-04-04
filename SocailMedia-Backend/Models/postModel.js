/** @format */

import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    desc: String,
    likes: [],
    likescount: {
      type: Number,
      default: 0,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Posts", postSchema);
