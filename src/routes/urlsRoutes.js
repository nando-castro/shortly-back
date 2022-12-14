import { Router } from "express";
import { validateUrl } from "../middlewares/validateUrl/validateUrl.js";
import {
  createdShorthenUrl,
  deleteUrl,
  getUrls,
  openShortLink,
} from "../controllers/urlsControllers.js";
import { validateToken } from "../middlewares/validateAuth/validateToken.js";
import { validateUrlExists } from "../middlewares/validateUrl/validateUrlExists.js";
import { validateSession } from "../middlewares/validateAuth/validateSession.js";

const router = Router();

router.post("/urls/shorten", validateUrl, validateToken, validateSession, createdShorthenUrl);
router.get("/urls/:id", validateUrlExists, getUrls);
router.get("/urls/open/:shortLink", openShortLink);
router.delete("/urls/:id", validateToken, deleteUrl);

export default router;
