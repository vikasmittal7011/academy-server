import { Router } from "express";

import { fetchUserData, updateUser } from "../controller/User.js";
import userAuth from "../middleware/userAuth.js";
import generalAuth from "../middleware/generalAuth.js";

const router = Router();

router.get("/", generalAuth, fetchUserData).patch("/", userAuth, updateUser);

export default router;
