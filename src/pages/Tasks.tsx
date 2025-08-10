import AddTaskForm from "../components/ui/AddTaskForm";
import TaskList from "../components/ui/TaskList";

export default function Tasks() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mis Tareas</h1>
      <h2 className="text-xl font-semibold mb-6">Aquí puedes agregar, editar, filtrar y organizar las tareas asignadas a tus proyectos.</h2>
      <AddTaskForm />
      <TaskList />
    </div>
  );
}
