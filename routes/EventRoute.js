import { Router } from "express";

import adminAuth from "../middleware/adminAuth.js";
import { createEvent, fetchAll } from "../controller/Event.js";

const router = Router();

router
    .get("/", fetchAll)
    .post("/", adminAuth, createEvent)

export default router;
