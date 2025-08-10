import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";
import type { TaskStatus } from "../../types";

import { useState } from "react";


export default function TaskList() {
  const { tasks, updateTaskStatus, removeTask } = useTasks();
  const { projects } = useProjects();

  const [filterStatus, setFilterStatus] = useState<TaskStatus | "Todos">("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const getProjectName = (id: number) =>
    projects.find((p) => p.id === id)?.name ?? "Sin proyecto";

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filterStatus === "Todos" || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (filteredTasks.length === 0) return <p>No hay tareas que coincidan.</p>;

  return (
    <div>
      {/* Filtros */}
      <div className="flex gap-4 mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as TaskStatus | "Todos")}
          className="border p-2 rounded"
        >
          <option value="Todos">Todos</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En progreso">En progreso</option>
          <option value="Completada">Completada</option>
        </select>

        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded flex-grow"
        />
      </div>

      {/* Lista */}
      <ul>
        {filteredTasks.map(({ id, title, projectId, status }) => (
          <li
            key={id}
            className="mb-3 p-3 border rounded shadow-sm flex justify-between items-center"
          >
            <div>
              <h4 className="font-semibold">{title}</h4>
              <p className="text-gray-600 text-sm">{getProjectName(projectId)}</p>
              <p className="text-sm italic">{status}</p>
            </div>
            <div className="flex gap-2">
              <select
                value={status}
                onChange={(e) => updateTaskStatus(id, e.target.value as TaskStatus)}
                className="border p-1 rounded"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="Completada">Completada</option>
              </select>
              <button
                onClick={() => removeTask(id)}
                className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
