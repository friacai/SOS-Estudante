import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  create,
  getById,
  list,
  remove,
  update,
} from "../controllers/task.controller.js";

const router = Router();

router.use(authenticate);

router.post("/", create);
router.delete("/:id", remove);
router.get("/", list);
router.put("/:id", update);
router.get("/:id", getById);

export default router;