import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  create,
  getById,
  list,
  remove,
  update,
} from "../controllers/subject.controller.js";

const router = Router();

router.use(authenticate);

router.post("/", create);
router.get("/", list);
router.delete("/:id", remove);
router.get("/:id", getById);
router.put("/:id", update);

export default router;