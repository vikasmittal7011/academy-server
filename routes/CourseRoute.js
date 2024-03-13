import { Router } from "express";

import adminAuth from "../middleware/adminAuth.js";
import { createCourse } from "../controller/Course.js";

const router = Router();

router.post("/", adminAuth, createCourse)

export default router;
