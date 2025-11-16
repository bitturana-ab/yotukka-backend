import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email"],
    },
    phone: {
      type: String,
      required: function () {
        return this.signupType !== "google";
      },
      match: [
        /^(\+\d{1,3}[- ]?)?\d{10}$/,
        "Please provide a valid phone number",
      ],
    },

    password: {
      type: String,
      minlength: 6,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    signUpType: {
      type: String,
      enum: ["google", "manual"], // allowed values
      default: "manual", // normal signup
    },
    address: {
      type: String,
      default: null,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
    },
    cart: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },

  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
