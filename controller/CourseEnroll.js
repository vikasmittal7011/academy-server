import HttpError from "../models/http-error.js";
import { CourseEnroll } from "../models/CourseEnroll.js";
import crypto from "crypto";

const success = true;

export const createCourseEnroll = async (req, res, next) => {
  try {

    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    } = req.body

    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedsignature = crypto.createHmac("sha256", process.env.RAZOR_PAY_SECRET).update(body.toString()).digest("hex")

    const isAuth = expectedsignature === razorpay_signature

    if (isAuth) {

      const createCourseEnroll = { ...req.query, dateOfEnroll: new Date(), user: req.userData.id };
      let courseEnroll = await CourseEnroll.create(createCourseEnroll);

      if (!courseEnroll) {
        return res.redirect("http://localhost:3000/failer/" + "Booking can't be done, plase try again lagter!!")
      }

      return res.redirect("http://localhost:3000/confirm/" + courseEnroll.id)

    } else {
      return res.redirect("http://localhost:3000/failer/" + "Booking can't be done, plase try again lagter!!")
    }

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
