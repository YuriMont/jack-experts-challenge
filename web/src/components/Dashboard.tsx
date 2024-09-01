import { useTask } from "../hooks/useTask";
import { ListTasks } from "./ListTasks";

export function Dashboard() {
  const { tasksQuery } = useTask();

  const tasks = tasksQuery.data || [];

  const incompletedTasks =
    tasks.filter((item) => item.completed === false) || [];

  const completedTasks = tasks.filter((item) => item.completed === true) || [];

  return (
    <section className="p-16 max-md:p-4 flex items-center flex-col gap-6 max-md:gap-4">
      {completedTasks.length > 0 && (
        <>
          <h2 className="text-xl font-light text-center">Tarefas concluidas</h2>
          <ListTasks tasks={completedTasks} />
        </>
      )}

      {tasks.length === 0 && (
        <div className="text-center text-xl font-medium  my-16">
          Nenhuma tarefa foi adicionada
        </div>
      )}

      {incompletedTasks.length > 0 && (
        <>
          <h2 className="text-xl font-light text-center">
            Todas as suas tarefas
          </h2>
          <ListTasks tasks={incompletedTasks} />
        </>
      )}
    </section>
  );
}
