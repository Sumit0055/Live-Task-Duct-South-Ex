import express from "express";
import {
  addComment,
  getComments,
} from "../controllers/comment.controller.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

router.post("/:postId", isAuth, addComment);
router.get("/:postId", getComments);

export default router;
