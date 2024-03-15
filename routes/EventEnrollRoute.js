import { Router } from "express";

import userAuth from "../middleware/userAuth.js";
import { createEventEnroll, getAllEventsEnroll, getEventEnrollById } from "../controller/EventEnroll.js";
import generalAuth from "../middleware/generalAuth.js";

const router = Router();

router
    .get("/", generalAuth, getAllEventsEnroll)
    .get("/id", getEventEnrollById)
    .post("/", userAuth, createEventEnroll)

export default router;
