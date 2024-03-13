import { Schema, model } from "mongoose";
const { ObjectId } = Schema

const EventEnrollSehema = Schema(
  {
    eventId: {
      type: ObjectId,
      ref: "Event",
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    totalPrice: { type: Number, required: true },
    referCode: { type: String, default: "" },
    dateOfEnroll: { type: Date, required: true },
    numberOfSeat: { type: Number, required: true },
  },
  { timestamps: true }
);

EventEnrollSehema.virtual("id").get(function () {
  return this._id.toHexString();
});

EventEnrollSehema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const EventEnroll = model("EventEnroll", EventEnrollSehema);
