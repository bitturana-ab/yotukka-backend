import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { sendMail } from "../utils/mail.js";
import { welcomeTemplate } from "../utils/emailTemplates.js";

// Sign up (or sign in if exists)
export const signup = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, phone, address } = req.body;
    let user = await User.findOne({ email }).session(session);

    // If user already exists -> sign in instead
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });
      return res.status(200).json({
        success: true,
        message: "User signed in successfully",
        data: { token, user },
      });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create([{ name, email, phone, address }], { session });

    const token = jwt.sign({ userId: user[0]._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    await session.commitTransaction();
    sendMail(email, "Welcome to YoTukka", welcomeTemplate(name));

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { token, user: user[0] },
    });
  } catch (error) {
    if (session.inTransaction()) await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// Sign in
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { token, user },
    });
  } catch (error) {
    next(error);
  }
};

// Sign out
export const signout = (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "User signed out successfully" });
};
