import HttpError from "../models/http-error.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { verify } = jwt;

export default (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new Error("Authentication Failed!!");
    }
    const tokenValue = verify(token, process.env.JWT_TOKEN);
    if (tokenValue.role === "admin") {
      req.userData = { id: tokenValue.id };
      next();
    } else {
      return next(new HttpError("You are not right user!!", 401));
    }
  } catch (err) {
    return next(new HttpError("Authentication Failed!!", 401));
  }
};
