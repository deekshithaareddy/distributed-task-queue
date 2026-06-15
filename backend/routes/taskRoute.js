import exp from "express";
import { createTask,getTaskById,getTasks,updateTask,deleteTask } from "../controllers/task.controller.js";
import auth from "../middlewares/auth.js";

const router = exp.Router();
router.post("/",auth,createTask);
router.get("/",auth,getTasks);
router.get("/:id",getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;