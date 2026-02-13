import User from "../models/usermodel.js";

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Admin Only Access" });
  }
  next();
};

export default isAdmin;
