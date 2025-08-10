import React, { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";
import type { TaskStatus } from "../../types";

export default function AddTaskForm() {
  const { addTask } = useTasks();
  const { projects } = useProjects();

  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState<number | "">("");
  const [status, setStatus] = useState<TaskStatus>("Pendiente");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("El título es obligatorio");
    if (projectId === "") return alert("Selecciona un proyecto");

    addTask({ title, projectId: Number(projectId), status });
    setTitle("");
    setProjectId("");
    setStatus("Pendiente");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />

      <select
        value={projectId}
        onChange={(e) => setProjectId(e.target.value === "" ? "" : Number(e.target.value))}
        className="border p-2 rounded w-full mb-2"
      >
        <option value="">Selecciona un proyecto</option>
        {projects.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
        className="border p-2 rounded w-full mb-4"
      >
        <option value="Pendiente">Pendiente</option>
        <option value="En progreso">En progreso</option>
        <option value="Completada">Completada</option>
      </select>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Agregar Tarea
      </button>
    </form>
  );
}

// import AddTaskForm from "../components/tasks/AddTaskForm";

// export default function Dashboard() {
//   return (
//     <div>
//       <AddTaskForm />
//       {/* Otros componentes */}
//     </div>
//   );
// }
