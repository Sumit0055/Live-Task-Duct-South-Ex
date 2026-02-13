import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  const { title, content, image } = req.body;

  const post = await Post.create({
    title,
    content,
    image,
    author: req.userId,
  });

  const populated = await post.populate("author", "name email role");
  res.status(201).json(populated);
};

export const getAllPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("author", "name email role")
    .sort({ createdAt: -1 });

  res.json(posts);
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) return res.status(404).json({ message: "Post Not Found" });

  if (post.author.toString() !== req.userId)
    return res.status(403).json({ message: "Not Authorized" });

  await post.deleteOne();
  res.json({ message: "Post Deleted" });
};
