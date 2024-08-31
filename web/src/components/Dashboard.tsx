import { useTask } from "../hooks/useTask";
import { ListTasks } from "./ListTasks";

export function Dashboard() {
  const { tasksQuery } = useTask();

  const tasks = tasksQuery.data || [];

  const favoritesTasks = tasks.filter((item) => item.favorite === true) || [];

  return (
    <section className="p-16 max-md:p-4 flex items-center flex-col gap-6 max-md:gap-4">
      {favoritesTasks.length > 0 && (
        <>
          <h2 className="text-xl font-light text-center">Favoritos</h2>
          <ListTasks tasks={favoritesTasks} />
        </>
      )}
      <h2 className="text-xl font-light text-center">Todas as suas tarefas</h2>
      {tasks.length === 0 ? (
        <div className="text-center text-xl font-medium my-8">
          Nenhuma tarefa foi adicionada
        </div>
      ) : (
        <ListTasks tasks={tasks} />
      )}
    </section>
  );
}
