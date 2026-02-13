import express from "express";
import {
  createPost,
  getAllPosts,
  deletePost,
} from "../controllers/post.controllers.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.post("/", isAuth, createPost);
router.get("/", getAllPosts);
router.delete("/:id", isAuth, deletePost);

export default router;
