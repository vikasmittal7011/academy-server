import { Router } from "express";

import { fetchUserData, updateUser } from "../controller/User.js";
import generalAuth from "../middleware/generalAuth.js";

const router = Router();

router.get("/", generalAuth, fetchUserData).patch("/", generalAuth, updateUser);

export default router;
