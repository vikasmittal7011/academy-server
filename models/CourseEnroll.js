import { Schema, model } from "mongoose";
const { ObjectId } = Schema

const CourseEnrollSehema = Schema(
  {
    courseId: {
      type: ObjectId,
      ref: "Course",
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
  },
  { timestamps: true }
);

CourseEnrollSehema.virtual("id").get(function () {
  return this._id.toHexString();
});

CourseEnrollSehema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const CourseEnroll = model("CourseEnroll", CourseEnrollSehema);
