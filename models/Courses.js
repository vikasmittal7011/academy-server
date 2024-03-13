import { Schema, model } from "mongoose";

const CourseSehema = Schema(
  {
    name: { type: String, required: true, },
    programmeType: { type: String, required: true, },
    mode: { type: String, required: true, },
    discription: { type: String, required: true, },
    eligibility: { type: String, required: true, },
    image: { type: String, required: true, },
    duration: { type: Number, required: true, },
    fees: { type: Number, required: true, },
  },
  { timestamps: true }
);

CourseSehema.virtual("id").get(function () {
  return this._id.toHexString();
});

CourseSehema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Course = model("Course", CourseSehema);
