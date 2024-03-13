import HttpError from "../models/http-error.js";
import { User } from "../models/User.js";

export const fetchUserData = async (req, res, next) => {
  const { id } = req.userData;
  try {
    const user = await User.findById(id, "-password");

    if (!user) {
      return next(new HttpError("User Not Found", 404));
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    return next(new HttpError("Internal server error", 500));
  }
}

export const updateUser = async (req, res, next) => {
  const { id } = req.userData;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
      "-password"
    );
    if (!user) {
      return next(new HttpError("User Not Found", 404));
    }
    res.status(200).json({
      success: true,
      user: req.body,
    });
  } catch (err) {
    return next(new HttpError("Internal server error", 500));
  }
}
