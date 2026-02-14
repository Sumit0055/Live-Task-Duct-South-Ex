import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email Exists" });

    if (password.length < 6)
      return res.status(400).json({ message: "Min 6 characters" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    const token = genToken(user._id);

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   sameSite: "strict",
    //   secure: false,
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",   // cross-site cookies allow
      secure: true,       // must be true for HTTPS (Vercel + Render are HTTPS)
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });


    res.status(201).json(user);
  } catch {
    res.status(500).json({ message: "Signup Error" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong Password" });

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(user);
  } catch {
    res.status(500).json({ message: "Login Error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged Out" });
};
