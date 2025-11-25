import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { genTokenAndSetCookie } from "../services/genTokenAndSetCookie.js";


export const signupUser = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUserWithemail = await User.findOne({ email });

    if (existingUserWithemail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    genTokenAndSetCookie(res, user);
    res.json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error at signup" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    genTokenAndSetCookie(res, user);
    res.json({
      success: true,
      message: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error at login" });
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "User logged out successfully" });
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "-password"
    );
    res.json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error at getting user" });
  }
};
