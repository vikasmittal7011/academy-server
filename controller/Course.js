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

export const getAllCourses = async (req, res, next) => {
  try {

    const courses = await Course.find();

    if (!courses) {
      return next(new HttpError("Courses not found , Plase try again later!!"));
    }

    res.json({ success, courses })

  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}

export const getCourseById = async (req, res, next) => {
  const { id } = req.params
  try {

    const course = await Course.findOne(id);

    if (!course) {
      return next(new HttpError("Course not found , Plase try again later!!"));
    }

    res.json({ success, course })

  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}

export const updateCourse = async (req, res, next) => {
  const { id } = req.useParams;
  try {
    const course = await Course.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true },
    );

    if (!course) {
      return next(new HttpError("Course not update , Plase try again later"));
    }

    res.json({ success, course })

  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}

export const deleteCourse = async (req, res, next) => {
  const { id } = req.useParams;
  try {
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return next(new HttpError("Course not delete , Plase try again later"));
    }

    res.json({ success })

  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}

