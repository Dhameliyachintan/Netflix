import { User } from "../modals/user.modal.js";
import bcryptjs from "bcryptjs";
import { generateTokanAndSetcode } from "../utils/generatetokan.js";

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fiels are required" });
    }
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const exisitingUserEmail = await User.findOne({ email: email });
    if (exisitingUserEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const exisitingUsername = await User.findOne({ username: username });
    if (exisitingUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      image,
    });

    generateTokanAndSetcode(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function login(req, res) {
 try {  
   const {email, password} = req.body;
   if  (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are"});
   }
    const user= await User.findOne({email:email})
    
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Credentials"})
    }

    const ispasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!ispasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid Credentials"})
    }

    generateTokanAndSetcode(user._id, res);
    await user.save();

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
     

 } catch (error) {
  console.log("Error in login controller", error.message);
  return res.status(500).json({ success: false, message: "Invalid server error"})
 }
}

export async function logout(req, res) {
    try {
      res.clearCookie("jwt-netflix");
      return res.status(200).json({ success: true, message: "Logged out successfully"});
    } catch (error) {
      console.log("Error in logout controller", error.message);
      return res.status(500).json({ success: false, message: "Internal server error"});
    }
}
