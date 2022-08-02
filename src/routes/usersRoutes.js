import { Router } from "express";
import { registerUser } from "../controllers/usersControllers.js";
import { validateUser } from "../middlewares/validateUser/validateUser.js";

const router = Router();

router.post("/signup", validateUser, registerUser);

export default router;