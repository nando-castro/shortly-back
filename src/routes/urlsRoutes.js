import { Router } from "express";
import { validateUrl } from "../middlewares/validateUrl/validateUrl.js";
import { createdShorthenUrl, getUrls } from "../controllers/urlsControllers.js";
import { validateToken } from "../middlewares/validateAuth/validateToken.js";
import { validateUrlExists } from "../middlewares/validateUrl/validateUrlExists.js";

const router = Router();

router.post("/urls/shorten", validateUrl, validateToken, createdShorthenUrl);
router.get("/urls/:id", validateUrlExists, getUrls);

export default router;
