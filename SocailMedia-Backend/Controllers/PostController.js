/** @format */
import postModel from "../Models/postModel.js";
import mongoose from "mongoose";
import userModel from "../Models/userModel.js";

export const test = async (req, res) => {
  console.log("Hitting this route");
  res.status(200).json({
    success: true,
  });
};

export const createPost = async (req, res, next) => {
  const userId = req.user._id;
  req.body.userId = userId;
  try {
    const post = new postModel(req.body);
    await post.save();
    res.status(200).json({
      success: true,
      post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

export const deletePost = async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user._id;
  try {
    const post = await postModel.findById(postId);
    if (post.userId.equals(userId)) {
      await postModel.findByIdAndDelete(postId);
      res.status(200).json({
        success: true,
        msg: "Post deleted",
      });
    } else {
      res.status(500).json({
        success: false,
        msg: "Action forbidden",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

export const getPost = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const post = await postModel.findById(postId);
    res.status(200).json({
      success: true,
      post,
    });
  } catch (erro) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

export const updatePost = async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user._id;

  try {
    const post = await postModel.findById(postId);

    if (post.userId.equals(userId)) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({
        success: true,
        msg: "updated Successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        msg: "Action frobidden",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

export const likePost = async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user._id;

  try {
    const post = await postModel.findById(postId);
    if (!post.likes.includes(userId)) {
      await post.updateOne({
        $push: { likes: userId },
        $inc: { likescount: 1 },
      });

      res.status(200).json({
        success: true,
        msg: "liked Successfully",
      });
    } else {
      await post.updateOne({
        $pull: { likes: userId },
        $inc: { likescount: -1 },
      });

      res.status(200).json({
        success: true,
        msg: "disliked Successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

export const getTimelinePosts = async (req, res, next) => {
  const userId = req.user._id;
  const followingPost = await userModel.aggregate(
    [
      {
        $match: { _id: userId },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "allpost",
        },
      },
      {
        $project: {
          allpost: 1,
          _id: 0,
        },
      },
    ],
    {}
  );

  res.status(200).json({
    success: true,
    ...followingPost[0],
  });
  try {
  } catch (err) {
    req.status(500).json({
      success: false,
      error: err,
    });
  }
};

// export const dislikePost = async (req, res, next) => {
//   const postId = req.params.id;
//   const userId = req.user._id;

//   try {
//     const post = await postModel.findById(postId);
//     if (post.likes.includes(userId)) {
//       await post.updateOne({
//         $pull: { likes: userId },
//         $inc: { likescount: -1 },
//       });

//       res.status(200).json({
//         success: true,
//         msg: "disliked Successfully",
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err,
//     });
//   }
// };
