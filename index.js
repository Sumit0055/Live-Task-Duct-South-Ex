// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import connectDb from "./config/db.js";

// import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/use.routes.js";
// import postRoutes from "./routes/post.routes.js";
// import commentRoutes from "./routes/comment.routes.js";

// dotenv.config();
// connectDb();

// const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/public", express.static("./public"))



// app.use(express.static(path.join(__dirname, 'dist')))

// app.use((req,res)=>{
//   express.static(path.join(__dirname, 'dist'))
// })



// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server Running on Port ${PORT}`);
// });





import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/use.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDb();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// ===== Middleware =====
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
app.use(cors())

app.use(express.json());
app.use(cookieParser());

// ===== API Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/public", express.static(path.join(__dirname, "public"))); // static public files

// ===== Serve React build =====
app.use(express.static(path.join(__dirname, "dist")));

// ===== Catch-all route for React SPA =====
// Use regex instead of '*' to avoid path-to-regexp ESM error
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});

