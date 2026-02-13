import express from "express";
import { getCurrentUser, getAllUsers } from "../controllers/user.controllers.js";
import isAuth from "../middleware/isAuth.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/me", isAuth, getCurrentUser);
router.get("/all", isAuth, isAdmin, getAllUsers);

export default router;
