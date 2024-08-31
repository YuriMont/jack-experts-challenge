import express from "express";
import TaskController from "../controllers/TasksController";
import { checkToken } from "../lib/core";

const taskRouter = express.Router();

taskRouter.get("/", checkToken, TaskController.getAllTasks);
taskRouter.get("/:id", checkToken, TaskController.findTaskById);
taskRouter.post("/", checkToken, TaskController.createTask);
taskRouter.put("/:id", checkToken, TaskController.updateTask);
taskRouter.delete("/:id", TaskController.deleteTaskById);

taskRouter.get("/favorites", checkToken, TaskController.getAllFavoritesTasks);
taskRouter.put("/favorites/:id", checkToken, TaskController.toggleFavoriteTaskById);

export default taskRouter;

