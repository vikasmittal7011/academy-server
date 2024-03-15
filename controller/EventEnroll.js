import HttpError from "../models/http-error.js";
import { EventEnroll } from "../models/EventEnroll.js"
import crypto from "crypto"

const success = true;

export const createEventEnroll = async (req, res, next) => {
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

      const createEventEnroll = { ...req.query, user: req.userData.id, dateOfEnroll: new Date() };
      let eventEnroll = await EventEnroll.create(createEventEnroll);

      if (!eventEnroll) {
        return res.redirect("http://localhost:3000/failer/" + "Booking can't be done, plase try again lagter!!")
      }

      return res.redirect("http://localhost:3000/confirm/" + eventEnroll.id)

    } else {
      return res.redirect("http://localhost:3000/failer/" + "Booking can't be done, plase try again lagter!!")
    }

  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}

export const getAllEventsEnroll = async (req, res, next) => {
  try {

    const { fetchType } = req.query

    let query = {};

    switch (fetchType) {
      case "day":
        query.dateOfEnroll = { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) };
        break;

      case "week":
        query.dateOfEnroll = { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) };
        break;

      case "month":
        query.dateOfEnroll = { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) };
        break;

      case "year":
        query.dateOfEnroll = { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) };
        break;

      default:
        break;
    }

    const eventEnrolls = await EventEnroll.find(query).populate("user").populate("eventId");

    if (!eventEnrolls) {
      return next(new HttpError("Event Enroll not found , Plase try again later!!"));
    }

    res.json({ success, eventEnrolls })

  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}

export const getEventEnrollById = async (req, res, next) => {
  const { id } = req.params
  try {

    const eventEnroll = await EventEnroll.findOne(id);

    if (!eventEnroll) {
      return next(new HttpError("Event enroll not found , Plase try again later!!"));
    }

    res.json({ success, eventEnroll })

  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}
