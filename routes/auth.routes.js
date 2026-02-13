// import express from "express"
// import { Login, logOut, signUp } from "../controllers/auth.controller.js"

// const authRouter = express.Router()

// authRouter.post("/signup", signUp)
// authRouter.post("/signin", Login)
// authRouter.get("/logout", logOut)

// export default authRouter














import express from "express";
import { signUp, signIn, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/logout", logout);

export default router;
