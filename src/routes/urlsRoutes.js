import { Router } from "express";
import { validateUrl } from "../middlewares/validateUrl/validateUrl.js";
import { createdShorthenUrl } from "../controllers/urlsControllers.js";
import { validateToken } from "../middlewares/validateAuth/validateToken.js";

const router = Router();

router.post("/urls/shorten", validateUrl, validateToken, createdShorthenUrl);

export default router;