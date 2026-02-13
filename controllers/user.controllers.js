// import { response } from "express"

// import User from "../models/usermodel.js"


// export const getCuresntUser = async (req, res) => {
//   try {
//     const userId = req.userId
//     const user = await User.findById(userId).select("-password")
//     if (!user) {
//       return res.status(400).json({ message: "User Not a Found" })
//     }
//     return res.status(200).json(user)
//   } catch (error) {
//     return res.status(400).json({ message: "get Current User Error" })
//   }
// }























import User from "../models/usermodel.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
};

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};
