import { Router } from "express";

import adminAuth from "../middleware/adminAuth.js";
import { createEvent, deleteEvent, fetchAll, fetchById, updateEvent } from "../controller/Event.js";

const router = Router();

router
    .get("/", fetchAll)
    .get("/:id", fetchById)
    .post("/", adminAuth, createEvent)
    .put("/:id", adminAuth, updateEvent)
    .delete("/:id", adminAuth, deleteEvent)

export default router;
