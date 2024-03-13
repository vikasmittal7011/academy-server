import { Course } from "../models/Courses.js";
import HttpError from "../models/http-error.js";
import { uploader } from "cloudinary";

const success = true;

export const createCourse = async (req, res, next) => {
  try {

    const cloudinaryResponse = await uploader.upload(req.body.image);

    const createCourse = { ...req.body, image: cloudinaryResponse.secure_url };
    let course = await Course.create(createCourse);

    if (!course) {
      return next(new HttpError("Course not add , Plase try again later"));
    }

    res.json({ success, course })

  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}
