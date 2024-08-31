import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { api } from "../lib/api";
import { Color, CreateTaskParams, Task } from "../types";

const cookies = new Cookies();

async function fetchTasksData(): Promise<Task[]> {
  try {
    const response = await api.get("/tasks", {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching tasks data:", error);
    throw error;
  }
}

async function createTask(task: CreateTaskParams): Promise<Task> {
  try {
    const response = await api.post(
      "/tasks",
      {
        title: task.title,
        content: task.content,
        color_id: task.color_id,
        favorite: task.favorite,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error changing color:", error);
    throw error;
  }
}

async function fetchColorsData(): Promise<Color[]> {
  try {
    const response = await api.get("/colors");
    return response.data;
  } catch (error) {
    console.error("Error fetching colors:", error);
    throw error;
  }
}

async function updateTask(task: Task): Promise<Task> {
  try {
    const response = await api.put(
      `/tasks/${task.id}`,
      {
        title: task.title,
        content: task.content,
        ...(task.color?.id && { color: task.color.id }),
      },
      {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}

async function deleteTaskById(id: number) {
  try {
    await api.delete(`/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}

async function toggleFavoriteTask(id: number) {

  try {
    await api.put(`/tasks/favorites/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });
  } catch (error) {
    console.error("Error toggling favorite task:", error);
    throw error;
  }
}

function searchTasks(
  queryClient: ReturnType<typeof useQueryClient>,
  query: string
): Task[] {
  try {
    const tasksData = queryClient.getQueryData<Task[]>(["tasks-data"]);

    if (!tasksData) {
      return [];
    }

    return tasksData.filter((task) =>
      task.title.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error("Error searching tasks:", error);
    throw new Error("Error searching tasks");
  }
}

export function useTask(query?: string) {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryFn: fetchTasksData,
    queryKey: ["tasks-data"],
  });

  const colorsQuery = useQuery({
    queryFn: fetchColorsData,
    queryKey: ["colors-data"],
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTaskById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks-data"] });
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks-data"] });
    },
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: toggleFavoriteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks-data"] });
    },
  });

  const editTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(
        ["tasks-data"],
        (oldData: Task[] | undefined) => {
          if (!oldData) return oldData;

          const updateTaskList = (tasks: Task[]) =>
            tasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            );

          return updateTaskList(oldData);
        }
      );
    },
  });

  const isSearching = Boolean(query && query.trim());
  const searchedTasks = isSearching
    ? searchTasks(queryClient, query || "")
    : [];

  return {
    tasksQuery,
    colorsQuery,
    searchedTasks,
    isSearching,
    editTask: editTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    createTask: createTaskMutation.mutate,
    toggleFavorite: toggleFavoriteMutation.mutate,
  };
}
