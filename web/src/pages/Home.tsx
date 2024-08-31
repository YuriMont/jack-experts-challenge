import logo from "@/assets/corelab-logo.svg";
import closeIcon from "@/assets/icons/close.svg";
import { CreateTaskForm } from "@/components/CreateTaskForm";
import { Dashboard } from "@/components/Dashboard";
import { ListTasks } from "@/components/ListTasks";
import { Modal } from "@/components/Modal";
import { useTask } from "@/hooks/useTask";
import { MagnifyingGlass, Plus, SignOut } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOppened, setIsModalOppened] = useState(false);
  const { searchedTasks, isSearching } = useTask(searchQuery);
  const cookies = new Cookies();
  const navigate = useNavigate();

  function handleLogout(){
    cookies.remove("token", { path: "/" });

    navigate("/sign-in")
  }

  return (
    <main className="min-h-dvh w-full bg-accent p-18 pt-8 max-md:pt-32">
      <header className="fixed z-50 top-0 w-full flex items-center gap-4 justify-around py-3 px-3 bg-white shadow-lg">
        <div className="flex items-center max-md:flex-col gap-2 max-md:gap-1 font-light text-xl">
          <img className="h-12 w-auto" src={logo} alt="CoreNotes Logo" />
        </div>
        <div className="relative flex items-center">
          <MagnifyingGlass
            className="absolute right-2"
            color="gray"
            size={24}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar tarefas..."
            className="bg-white border shadow-md w-[60vw] max-md:w-full border-gray-300 pr-12 rounded-md px-3 py-2 text-lg font-light line-clamp-2"
          />
        </div>
        {isSearching ? (
          <button onClick={() => setSearchQuery("")}>
            <img className="h-6 w-auto" src={closeIcon} alt="close-icon" />
          </button>
        ) : (
          <button
            className="bg-blue-500 flex gap-2 items-center px-3 py-2 rounded-lg text-white shadow-md"
            onClick={() => setIsModalOppened(true)}
          >
            <Plus size={24} />
            <span className="hidden text-lg sm:inline">Criar Atividade</span>
          </button>
        )}
        <button
          className="bg-accent rounded-md p-1 hover:opacity-70 transition-opacity border"
          onClick={handleLogout}
        >
          <SignOut size={32} />
        </button>
      </header>

      <section>
        {isSearching ? (
          <div className="px-16 pt-16 max-md:p-4">
            {searchedTasks.length === 0 ? (
              <div>Nenhuma tarefa encontrada para "{searchQuery}"</div>
            ) : (
              <ListTasks tasks={searchedTasks} />
            )}
          </div>
        ) : (
          <Dashboard />
        )}
        <Modal onClose={setIsModalOppened} open={isModalOppened}>
          <CreateTaskForm />
        </Modal>
      </section>
    </main>
  );
}
