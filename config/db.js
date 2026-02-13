// import  mongoose from "mongoose"

// const connectDb = async ()=>{
//     try {
//         await mongoose.connect(process.env.MONGODB_URL)
//         console.log("MongoDB is Connected")
//     } catch (error) {
//         console.log(error)
//     }
// }

// export default connectDb 














import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log("❌ DB Error:", error.message);
    process.exit(1);
  }
};

export default connectDb;
