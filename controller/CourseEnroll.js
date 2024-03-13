import HttpError from "../models/http-error.js";
import { CourseEnroll } from "../models/CourseEnroll.js"

const success = true;

export const createCourseEnroll = async (req, res, next) => {
  try {

    const createCourseEnroll = { ...req.body };
    let courseEnroll = await CourseEnroll.create(createCourseEnroll);

    if (!courseEnroll) {
      return next(new HttpError("CourseEnroll not add , Plase try again later"));
    }

    res.json({ success, courseEnroll })

  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}

export const getAllCoursesEnroll = async (req, res, next) => {
  try {

    const coursesEnrolls = await CourseEnroll.find();

    if (!coursesEnrolls) {
      return next(new HttpError("Courses Enroll not found , Plase try again later!!"));
    }

    res.json({ success, coursesEnrolls })

  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}

export const getCourseEnrollById = async (req, res, next) => {
  const { id } = req.params
  try {

    const courseEnroll = await CourseEnroll.findOne(id);

    if (!courseEnroll) {
      return next(new HttpError("Courseenroll not found , Plase try again later!!"));
    }

    res.json({ success, courseEnroll })

  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}
