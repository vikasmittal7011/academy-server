import pkg from 'jsonwebtoken';
import dotenv from 'dotenv';
const { sign } = pkg;
dotenv.config();

const generateOTPTokenAndSetCookie = (otp, res) => {
  try {
    const token = sign({ otp }, process.env.JWT_TOKEN, {
      expiresIn: "5m",
    });

    res.cookie("otp", token, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
      sameSite: "strict",
    });

    return token;
  } catch (err) {
  }
};

export default generateOTPTokenAndSetCookie;
