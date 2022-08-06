import { Router } from "express";
import {
  getUrlsUser,
  loginUser,
  registerUser,
} from "../controllers/usersControllers.js";
import { validateToken } from "../middlewares/validateAuth/validateToken.js";
import { validateLogin } from "../middlewares/validateUser/validadeLogin.js";
import { validateUser } from "../middlewares/validateUser/validateUser.js";

const router = Router();

router.post("/signup", validateUser, registerUser);
router.post("/signin", validateLogin, loginUser);
router.get("/users/me", validateToken, getUrlsUser);

export default router;
