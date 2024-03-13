import HttpError from "../models/http-error.js";
import { EventEnroll } from "../models/EventEnroll.js"

const success = true;

export const createEventEnroll = async (req, res, next) => {
  try {

    const createEventEnroll = { ...req.body };
    let eventEnroll = await EventEnroll.create(createEventEnroll);

    if (!eventEnroll) {
      return next(new HttpError("Event Enroll not add , Plase try again later"));
    }

    res.json({ success, eventEnroll })

  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}

export const getAllEventsEnroll = async (req, res, next) => {
  try {

    const eventEnrolls = await EventEnroll.find();

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
