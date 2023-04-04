/** @format */

import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getTimelinePosts,
  likePost,
  updatePost,
} from "../Controllers/PostController.js";
import { isLogedIn } from "../Middlewares/isLogedIn.js";

const router = express.Router();

router.route("/createpost").post(isLogedIn, createPost);
router.route("/deletepost/:id").delete(isLogedIn, deletePost);
router.route("/getpost/:id").get(isLogedIn, getPost);
router.route("/updatepost/:id").put(isLogedIn, updatePost);
router.route("/like/:id").put(isLogedIn, likePost);
router.route("/newsfeed/posts").get(isLogedIn, getTimelinePosts);

export default router;
