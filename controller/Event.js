import Event from "../models/Events.js";
import HttpError from "../models/http-error.js";

const success = true;

export const createEvent = async (req, res, next) => {
  try {

    const createEvent = { ...req.body };
    let event = await Event.create(createEvent);

    if (!event) {
      return next(new HttpError("Event not add , Plase try again later"));
    }

    res.json({ success, event })

  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}

export const fetchAll = async (req, res, next) => {
  try {
    let events = await Event.find();

    if (!events) {
      return next(new HttpError("Event not found , Plase try again later"));
    }

    res.json({ success, events })

  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}

export const fetchById = async (req, res, next) => {
  const { id } = req.params
  try {
    let event = await Event.findOne(id);

    if (!event) {
      return next(new HttpError("Event not found , Plase try again later"));
    }

    res.json({ success, event })

  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}

export const updateEvent = async (req, res, next) => {
  const { id } = req.useParams;
  try {
    const event = await Event.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true },
    );

    if (!event) {
      return next(new HttpError("Event not update , Plase try again later"));
    }

    res.json({ success, event })

  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}

export const deleteEvent = async (req, res, next) => {
  const { id } = req.useParams;
  try {
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return next(new HttpError("Event not delete , Plase try again later"));
    }

    res.json({ success })

  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
}
