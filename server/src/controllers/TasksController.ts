import { Request, Response } from "express";
import { z } from "zod";
import TaskServices from "../services/TaskServices";

export default class TaskController {
  static async getAllTasks(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const tasks = await TaskServices.getAllTasks(userId);

      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async getAllFavoritesTasks(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const tasks = await TaskServices.getAllCompleteds(userId);

      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async findTaskById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const task = await TaskServices.findTaskById(id);

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async deleteTaskById(req: Request, res: Response) {
    try {
      const {userId, id} = req.params;

      await TaskServices.deleteTask(id, userId);

      return res.status(200).json({ message: "Task deleted successfully!" });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async updateTask(req: Request, res: Response) {
    try {
      const { id, userId } = req.params;

      const updateTaskSchema = z.object({
        title: z.string().min(3, "the title must have more than 3 characters"),
        content: z
          .string()
          .min(10, "the content must have more than 10 characters"),
        color: z.number().optional(),
      });

      const bodyRequest = updateTaskSchema.parse(req.body);

      const task = await TaskServices.updateTask(userId, { id: Number(id), ...bodyRequest });

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async createTask(req: Request, res: Response) {
    try {
      const createTaskSchema = z.object({
        title: z.string().min(3, "the title must have more than 3 characters"),
        content: z
          .string()
          .min(10, "the content must have more than 10 characters"),
        color_id: z.number().optional(),
      });

      const { userId } = req.params;

      const bodyRequest = createTaskSchema.parse(req.body);

      const task = await TaskServices.createTask({
        ...bodyRequest,
        author_id: userId,
      });

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async toggleFavoriteTaskById(req: Request, res: Response) {
    try {
      const {id, userId} = req.params;
      await TaskServices.toggleFavorite(Number(id), userId);

      return res.status(200).json({ message: "Task updated successfully!" });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
