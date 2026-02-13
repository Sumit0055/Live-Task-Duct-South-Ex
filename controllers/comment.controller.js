import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

export const addComment = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: "Post Not Found" });

  const comment = await Comment.create({
    text: req.body.text,
    user: req.userId,
    post: req.params.postId,
  });

  const populated = await comment.populate("user", "name role");
  res.status(201).json(populated);
};

export const getComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user", "name role")
    .sort({ createdAt: -1 });

  res.json(comments);
};
