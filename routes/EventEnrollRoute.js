import { Router } from "express";

import userAuth from "../middleware/userAuth.js";
import { createEventEnroll, getAllEventsEnroll, getEventEnrollById } from "../controller/EventEnroll.js";

const router = Router();

router
    .get("/", getAllEventsEnroll)
    .get("/id", getEventEnrollById)
    .post("/", userAuth, createEventEnroll)

export default router;
