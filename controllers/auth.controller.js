// import  genToken from "../config/token.js" 
// import  User from "../models/usermodel.js"
// import  bcrypt from "bcryptjs"

// export const signUp = async (req, res) => {
//     try {
//         const { name, email, password } = req.body

//         const existEmail = await User.findOne({email})
//         if(existEmail){
//             return res.status(400).json({message:"Email Already Exists!"})
//         }
// //----------------password Length Check----------------
//         if(password.length<6){
//             return res.status(400).json({message:"Password Must Be Atleast 6 Characters!"})
//         }
// //-------------genrated hashed Password-----------------
//         const hashedPassword = await bcrypt.hash(password,10)
// //----------------Create User---------------
//         const user = await User.create({
//             name,
//             password:hashedPassword,
//             email
//         })


//         const token = await genToken(user._id)

//         res.cookie("token",token,{
//             httpOnly:true,
//             maxAge:7*24*60*60*1000,
//             sameSite:"strict",
//             secure:false
//         })

//         return res.status(201).json(user)
//     } catch (error) {
//         console.log(error.response?.data)
//                 return res.status(500).json({message:`SignUp Error`})
                

//     }
// }


// export const Login = async (req, res) => {
//     try {
//         const {email, password } = req.body

//         const user = await User.findOne({email})
//         if(!user){
//             return res.status(400).json({message:"Email Does Not Exists!"})
//         }

//         const isMatch = await bcrypt.compare(password,user.password)

//         if(!isMatch){
//             return res.status(400).json({message:"Inccorect Password"})
//         }


//         const token = await genToken(user._id)

//         res.cookie("token",token,{
//             httpOnly:true,
//             maxAge:7*24*60*60*1000,
//             sameSite:"strict",
//             secure:false
//         })

//         return res.status(200).json(user)
//     } catch (error) {
//                 return res.status(500).json({message:`Login Error`})
//     }
// }


// export const logOut = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       sameSite: "strict",
//       secure: false,
//       path: "/",   // add this for safety
//     });

//     return res.status(200).json({ message: "Logout Successfully!" });
//   } catch (error) {
//     return res.status(500).json({ message: "Logout Error" });
//   }
// };













































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

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
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
