import { Router } from "express";

import adminAuth from "../middleware/adminAuth.js";
import { createCourse, getAllCourses } from "../controller/Course.js";

const router = Router();

router
    .get("/", getAllCourses)
    .post("/", adminAuth, createCourse)

export default router;
