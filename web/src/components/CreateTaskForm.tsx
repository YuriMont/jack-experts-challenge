import { zodResolver } from "@hookform/resolvers/zod";
import { Palette, Plus } from "@phosphor-icons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTask } from "../hooks/useTask";
import { Popover } from "./Popover";

const createTaskFormSchema = z.object({
  title: z.string(),
  content: z.string(),
  color_id: z.number().optional(),
});

type CreateTaskFormSchema = z.infer<typeof createTaskFormSchema>;

export function CreateTaskForm() {
  const { colorsQuery } = useTask();
  const [colorCode, setColorCode] = useState("#ffffff");
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateTaskFormSchema>({
    resolver: zodResolver(createTaskFormSchema),
  });

  const { createTask } = useTask();

  function handleSubmitCreateTask(data: CreateTaskFormSchema) {
    try {
      createTask({
        title: data.title,
        content: data.content,
        color_id: data.color_id,
      });
    } catch (error) {
      console.error(error);
    } finally {
      reset();
      setColorCode("#ffffff");
    }
  }

  function changeColorTask(color_id: number, color_code: string) {
    setColorCode(color_code);
    setValue("color_id", color_id)
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitCreateTask)}
      style={{ backgroundColor: colorCode }}
      className="flex flex-col w-[520px] h-[280px] max-md:h-[420px] max-md:w-full rounded-lg"
    >
      <input
        {...register("title")}
        type="text"
        placeholder="Título"
        className="p-4 pb-2 focus:outline-none border-b-[3px] bg-transparent border-b-gray-300 placeholder:text-black"
      />
      <textarea
        {...register("content")}
        className="flex-1 p-4 resize-none font-light focus:outline-none bg-transparent placeholder:text-black"
        placeholder="criar nota..."
      />

      <div className="flex items-center justify-between w-full px-4 py-3 gap-2">
        <Popover
          content={
            <div className="grid grid-cols-10 max-md:grid-cols-6 place-content-center gap-2">
              {colorsQuery.data?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => changeColorTask(item.id, item.code)}
                  className="rounded-full h-8 w-8 border border-gray-400 cursor-pointer"
                  style={{ backgroundColor: item.code }}
                  aria-label={`selecionar cor ${item.code}`}
                />
              ))}
            </div>
          }
        >
          <Palette size={32} />
        </Popover>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 uppercase border-black border rounded-md text-black px-3 py-2"
        >
          <Plus size={20} weight="bold" />
          Criar
        </button>
      </div>
    </form>
  );
}
