import pkg from 'jsonwebtoken';
import dotenv from 'dotenv';
const { sign } = pkg;
dotenv.config();

const generateTokenAndSetCookie = (id, role, res) => {
  try {
    const token = sign({ id, role }, process.env.JWT_TOKEN, {
      expiresIn: "15d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    return token;
  } catch (err) {
  }
};

export default generateTokenAndSetCookie;
