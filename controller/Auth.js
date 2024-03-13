import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

import { User } from "../models/User.js";
import HttpError from "../models/http-error.js";
import transporter from "../utils/nodemailer.js";
import userOTPTemplate from "../utils/userOTPTemplate.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookies.js";
import generateOTPTokenAndSetCookie from "../utils/generateOTPTokenAndSetCookies.js";

const { sign, verify } = jwt;
const { hash, compare } = bcryptjs;
const jwt_key = process.env.JWT_TOKEN;
const salt = process.env.SALT;

export const sendOtp = async (req, res, next) => {
  const { email } = req.body

  const otp = Math.round(Math.random() * 900000) + 100000

  try {
    if (email) {

      const user = await User.findOne({ email: email });
      if (user) {
        return next(
          new HttpError("Email is already exsit, try with different email", 422)
        );
      }

      const info = transporter.sendMail({
        from: {
          name: "Vikey's Holidays",
          address: "workvikas200229@gmail.com"
        },
        to: email,
        subject: "Otp verification",
        html: userOTPTemplate(otp),
      });

      const optToken = generateOTPTokenAndSetCookie(otp, res)

      if (info) {
        res.json({ success: true, optToken });
      } else {
        res.json({ message: "Email not send, try again later!!" });
      }

    } else {
      res.json({ message: "Enter a valid email" })
    }
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}

export const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return next(new HttpError(errorMessages, 422));
  }
  let user;
  try {
    hash(req.body.password, parseInt(salt)).then(async (pass) => {
      const createUser = { ...req.body, password: pass };
      user = await User.create(createUser);
      const token = generateTokenAndSetCookie(user.id, user.role, res);
      res.cookie("otp", "");
      return res.json({
        success: true,
        token,
        user: user,
      });
    });
  } catch (err) {
    return next(new HttpError("Internal server error", 500));
  }
}

export const loginUser = async (req, res, next) => {
  let { password } = req.body;
  let user, comparePassword, token;
  try {
    user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new HttpError("Enter valid credential", 404));
    }

    comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      return next(new HttpError("Enter valid credential", 404));
    }

    token = generateTokenAndSetCookie(user._id, user.role, res);

    res.json({ token, success: true, user: user });
  } catch (err) {
    return next(new HttpError("Internal server error", 500));
  }
}

export const logoutUser = async (req, res, next) => {
  try {
    res.cookie("jwt", "");
    res.json({ message: "Logout successfully", success: true });
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}

export const resetPasswordRequest = async (req, res, next) => {
  let { email } = req.body;
  try {
    let user = await User.findOne({ email: email });

    if (!user) {
      return next(new HttpError("User is not exist, check your email", 404));
    }

    const token = sign({ email: email }, jwt_key, { expiresIn: "5m" });

    user.passwordResetToken = token;

    await user.save();

    const info = await transporter.sendMail({
      from: "myshop@gmail.com",
      to: email,
      subject: "Reset Your Password!!",
      html: `<p>Click <a href="http://localhost:3000/login/reset-password?token=${token}">here</a> to reset your password!!</p>`,
    });

    if (info) {
      res.json({ success: true });
    }
    res.json({
      success: false,
      message: "Failed to send email please try again later",
    });
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const tokenValue = verify(token, process.env.JWT_TOKEN);
    if (!tokenValue) {
      return next(new HttpError("Request Time, Reset Request Again!!", 401))
    }
    const { email } = tokenValue;
    let user;
    user = await User.findOne({ email: email });
    if (token !== user.passwordResetToken) {
      return next(new HttpError("Bad Request, failed to reset password", 422));
    }
    hash(password, parseInt(salt)).then(async (pass) => {
      user.password = pass;
      user.passwordResetToken = "";
      await user.save();
      return res.json({
        success: true,
      });
    });
  } catch (err) {
    return next(new HttpError("Request Time Out, Send Request Again!!", 500));
  }
}
