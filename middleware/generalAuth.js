import HttpError from "../models/http-error.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const { verify } = jwt

export default (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new Error("Authentication Failed!");
    }
    const tokenValue = verify(token, process.env.JWT_TOKEN);
    if (tokenValue) {
      req.userData = { id: tokenValue.id };
      next();
    }
  } catch (err) {
    return next(new HttpError("Authentication Failed!!", 401));
  }
};
