import { Router } from "express";

import { fetchUserData, updateUser, validateReferCode } from "../controller/User.js";
import generalAuth from "../middleware/generalAuth.js";

const router = Router();

router
    .get("/", generalAuth, fetchUserData)
    .get("/validate/refer/code", generalAuth, validateReferCode)
    .patch("/", generalAuth, updateUser);

export default router;
