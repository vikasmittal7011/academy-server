import { Router } from "express";

import adminAuth from "../middleware/adminAuth.js";
import { createEvent, deleteEvent, fetchAll, updateEvent } from "../controller/Event.js";

const router = Router();

router
    .get("/", fetchAll)
    .post("/", adminAuth, createEvent)
    .put("/:id", adminAuth, updateEvent)
    .delete("/:id", adminAuth, deleteEvent)

export default router;
