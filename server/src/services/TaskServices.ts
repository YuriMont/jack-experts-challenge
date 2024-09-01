import { prisma } from "../lib/prisma";
import { CreateTaskParams, ITask } from "../types";

export default class TaskServices {
  static async getAllTasks(author_id: string) {
    const tasks = await prisma.task.findMany({
      where: {
        author_id
      },
      orderBy: {
        title: "asc",
      },
      select: {
        id: true,
        title: true,
        content: true,
        color: true,
        completed: true,
      }
    });

    return tasks;
  }

  static async findTaskById(id: number) {
    return await prisma.task.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        color: true,
        completed: true,
      }
    });
  }

  static async createTask({ title, content, author_id, color_id }: CreateTaskParams) {
    return await prisma.task.create({
      data: {
        title,
        content,
        author_id,
        color_id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        color: true,
        completed: true,
      }
    });
  }

  static async updateTask(userId: string, { id, title, content, color }: ITask) {
    return await prisma.task.update({
      data: {
        title,
        content,
        color_id: color,
      },
      where: {
        id,
        AND: {
          author_id: userId
        }
      },
      select:{
        color: true,
        content: true,
        completed: true,
        id: true,
        title: true,
        color_id: true,
      }
    });
  }

  static async deleteTask(id: string, userId: string) {
    await prisma.task.delete({
      where: {
        id: Number(id),
        AND: {
          author_id: userId
        },
      },
    });
  }

  static async toggleFavorite(id: number, userId: string) {
    const getCompletedValue = await prisma.task.findFirst({
      where: {
        id,
        AND: {
          author_id: userId
        }
      },
      select: {
        completed: true,
      },
    });

    await prisma.task.update({
      data: {
        completed: !getCompletedValue?.completed,
      },
      where: {
        id,
      },
    });
  }

  static async getAllCompleteds(author_id: string){
    return await prisma.task.findMany({
      where: {
        completed: true,
        author_id,
      },
      select: {
        title: true,
        content: true,
        color: true,
        completed: true,
      }
    })
  }
}
