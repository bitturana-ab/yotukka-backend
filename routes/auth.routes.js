import { Router } from "express";
import * as authentication from "../controllers/auth.controller.js";
import User from "../models/user.model.js";
// import twilio from "twilio/lib/rest/Twilio.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authrouter = Router();
// const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Authentication Routes
authrouter.post("/signup", authentication.signup);
authrouter.post("/signin", authentication.signin);
authrouter.post("/signout", authMiddleware, authentication.signout);

// Send OTP
// authrouter.post("/send-otp", async (req, res) => {
//   const { phone, name, email, password, address } = req.body;
//   const otp = Math.floor(100000 + Math.random() * 900000);
//   const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

//   try {
//     let user = await User.findOne({ phone });

//     if (!user) {
//       user = new User({
//         phone,
//         otp,
//         otpExpires,
//         name: name || "AB User",
//         email: email || `user${Date.now()}@example.com`,
//         password: password || Math.random().toString(36).slice(-8),
//         address: address || "No address provided",
//       });
//     } else {
//       user.otp = otp;
//       user.otpExpires = otpExpires;
//     }

//     await user.save();

//     await client.messages.create({
//       body: `Your OTP is ${otp}`,
//       from: TWILIO_PHONE_NUMBER,
//       to: phone,
//     });

//     res.json({ success: true, message: "OTP sent successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: `Error sending OTP: ${error.message}` });
//   }
// });

// // Verify OTP
// authrouter.post("/verify-otp", async (req, res) => {
//   const { phone, otp } = req.body;

//   try {
//     const user = await User.findOne({ phone });

//     if (!user || user.otp !== otp || new Date() > user.otpExpires) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid or expired OTP" });
//     }

//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     const token = jwt.sign({ phone: user.phone }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({
//       success: true,
//       message: "OTP verified successfully",
//       data: { token, user },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: `Error verifying OTP: ${error.message}`,
//     });
//   }
// });

export default authrouter;
