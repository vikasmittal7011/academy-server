import { Schema, model } from "mongoose";

const UserSehema = Schema(
  {
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: Number, default: "" },
    role: { type: String, required: true, default: "admin" },
    passwordResetToken: { type: String, default: "" },
  },
  { timestamps: true }
);

UserSehema.virtual("id").get(function () {
  return this._id.toHexString();
});

UserSehema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const User = model("User", UserSehema);
