// import jwt from "jsonwebtoken"

// const genToken = async(userId)=>{
//     try {
//         const token = await jwt.sign({userId},process.env.JWT_SECRET, {expiresIn:"7d"})
//         return token
//     } catch (error) {
//         console.log(error)
//     }
// }

// export default genToken


















import jwt from "jsonwebtoken";

const genToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export default genToken;
