import { Router } from "express";
import { loginUser, registerUser } from "../controllers/usersControllers.js";
import { validateLogin } from "../middlewares/validateUser/validadeLogin.js";
import { validateUser } from "../middlewares/validateUser/validateUser.js";

const router = Router();

router.post("/signup", validateUser, registerUser);
router.post("/signin", validateLogin, loginUser);

export default router;