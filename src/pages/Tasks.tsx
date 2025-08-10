import AddTaskForm from "../components/ui/AddTaskForm";
import TaskList from "../components/ui/TaskList";

export default function Tasks() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mis Tareas</h1>
      <AddTaskForm />
      <TaskList />
    </div>
  );
}
