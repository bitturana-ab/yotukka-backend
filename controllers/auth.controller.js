import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { sendMail } from "../utils/mail.js";
import { welcomeTemplate } from "../utils/emailTemplates.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

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

// GOOGLE OAuth Strategy Setup
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/v1/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;

        let user = await User.findOne({ email });

        // If new user → create
        if (!user) {
          user = await User.create({
            name,
            email,
            phone: "",
            address: "",
            password: null, // Google users don’t have password
            signupType: "google",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize/Deserialize
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export const googleAuthSuccess = async (req, res) => {
  try {
    const user = req.user;

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    // Redirect back to frontend with JWT & User Info
    const redirectURL = `${process.env.CLIENT_URL}/google-success?token=${token}`;

    res.redirect(redirectURL);
  } catch (error) {
    res.redirect(`${process.env.CLIENT_URL}/signup?error=1`);
  }
};
