import { Router } from "express";

import adminAuth from "../middleware/adminAuth.js";
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from "../controller/Course.js";

const router = Router();

router
    .get("/", getAllCourses)
    .get("/:id", getCourseById)
    .post("/", adminAuth, createCourse)
    .put("/:id", adminAuth, updateCourse)
    .delete("/:id", adminAuth, deleteCourse)

export default router;
