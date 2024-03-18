import cors from "cors";
import dotenv from 'dotenv';
import { config } from "cloudinary";
import path, { dirname } from 'path';
import cookieparser from "cookie-parser";
import express, { json, urlencoded } from "express";

dotenv.config();

import Auth from "./routes/AuthRoute.js";
import User from "./routes/UserRoute.js";
import Event from "./routes/EventRoute.js";
import connection from "./utils/database.js";
import Course from "./routes/CourseRoute.js";
import EventEnroll from "./routes/EventEnrollRoute.js";
import CourseEnroll from "./routes/CourseEnrollRoute.js";

import { fileURLToPath } from "url";
import HttpError from "./models/http-error.js";
import { createPayment } from "./utils/paymentIntent.js";

const app = express();

const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connection()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(json({ limit: "50mb" }));
app.use(urlencoded({ extended: true }));
app.use(cookieparser());
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
    origin: ["http://localhost:3000", "http://127.0.0.1:5173"],
    credentials: true
  })
);
app.use(json());
app.use(express.static(path.join(__dirname, "./build")));
app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
  next();
});

config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_PUBLIC,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.use("/api/auth", Auth);
app.use("/api/user", User);
app.use("/api/event", Event);
app.use("/api/course", Course);
app.use("/api/event/enroll", EventEnroll);
app.use("/api/course/enroll", CourseEnroll);

app.post("/api/payment/intent", createPayment)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.use((req, res, next) => {
  next(new HttpError("Route Not found", 404));
});

app.use((error, req, res, next) => {
  if (res.heardersSent) {
    return next(error);
  }
  res
    .status(error.errorCode || 500)
    .json({ message: error.message || error.message });
});

app.listen(PORT);
