import { Router } from "express";

import userAuth from "../middleware/userAuth.js";
import { createCourseEnroll, getAllCoursesEnroll, getCourseEnrollById } from "../controller/CourseEnroll.js";
import generalAuth from "../middleware/generalAuth.js";

const router = Router();

router
    .get("/fetch", generalAuth, getAllCoursesEnroll)
    .get("/id", getCourseEnrollById)
    .post("/", userAuth, createCourseEnroll)

export default router;
