import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Palette, PencilSimple, Star, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTask } from "../hooks/useTask";
import { Task } from "../types";
import { Popover } from "./Popover";

const taskSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  content: z.string().min(1, "O conteúdo é obrigatório"),
});

type TaskSchema = z.infer<typeof taskSchema>;

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { colorsQuery, editTask, deleteTask, toggleComplete } = useTask();
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      content: task.content,
    },
  });

  const onSubmit = (data: TaskSchema) => {
    editTask({
      ...task,
      title: data.title,
      content: data.content,
    });
    setIsEditing(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col rounded-xl bg-white w-[360px] h-[420px] shadow-lg border-gray-300 border text-lg"
      style={{ backgroundColor: task.color?.code }}
    >
      <Star
        className="absolute top-5 right-2 cursor-pointer"
        onClick={() => toggleComplete(task.id)}
        size={20}
        color={task.completed ? "#ffff00" : "#121212"}
        weight={task.completed ? "fill" : "regular"}
      />
      <input
        type="text"
        disabled={!isEditing}
        {...register("title")}
        className="p-4 pb-2 pr-8 focus:outline-none border-b-[3px] bg-transparent border-b-gray-300 overflow-ellipsis line-clamp-2"
      />
      <textarea
        disabled={!isEditing}
        {...register("content")}
        className="focus:outline-none resize-none p-4 font-light bg-transparent flex-1 overflow-auto line-clamp-2"
      />

      <div className="flex items-center gap-2 w-full px-4 py-3">
        {!isEditing && (
          <button type="button" onClick={() => setIsEditing(true)}>
            <PencilSimple size={24} />
          </button>
        )}
        {isEditing && (
          <button type="submit">
            <Check size={20} weight="bold" />
          </button>
        )}
        <Popover
          content={
            <div className="grid grid-cols-10 max-md:grid-cols-6 place-content-center gap-2">
              {colorsQuery.data?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => editTask({ ...task, color: item })}
                  className="rounded-full h-8 w-8 border border-gray-400 cursor-pointer"
                  style={{ backgroundColor: item.code }}
                  aria-label={`selecionar cor ${item.code}`}
                />
              ))}
            </div>
          }
        >
          <Palette size={24} />
        </Popover>
        <button
          disabled={isEditing}
          type="button"
          className="disabled:opacity-40 absolute right-4"
          onClick={() => deleteTask(task.id)}
        >
          <Trash size={24} />
        </button>
      </div>
    </form>
  );
}
