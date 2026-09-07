import { Router } from "express";
import {
  getMe,
  updatePreferences,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", authenticate, getMe);
router.put("/me/preferences", authenticate, updatePreferences);

export default router;