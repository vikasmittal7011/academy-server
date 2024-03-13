import { Router } from "express";

import adminAuth from "../middleware/adminAuth.js";
import { createEvent } from "../controller/Event.js";

const router = Router();

router.post("/", adminAuth, createEvent)

export default router;
