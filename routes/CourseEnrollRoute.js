import { Router } from "express";

import userAuth from "../middleware/userAuth.js";
import { createCourseEnroll, getAllCoursesEnroll, getCourseEnrollById } from "../controller/CourseEnroll.js";

const router = Router();

router
    .get("/", getAllCoursesEnroll)
    .get("/id", getCourseEnrollById)
    .post("/", userAuth, createCourseEnroll)

export default router;
