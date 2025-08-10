import { useTasks } from "../context/TaskContext";
import { useProjects } from "../context/ProjectContext";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { tasks } = useTasks();
  const { projects } = useProjects();
  const { user } = useAuth();

  const pendientes = tasks.filter(t => t.status === "Pendiente").length;
  const enProgreso = tasks.filter(t => t.status === "En progreso").length;
  const completadas = tasks.filter(t => t.status === "Completada").length;

  const ultimasTareas = tasks.slice(-5).reverse();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {user ? `¡Hola, ${user.username}!` : "Dashboard"}
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Visualiza el estado actual de tus proyectos y tareas, con estadísticas rápidas para un mejor control.</h2>
        <div className="flex gap-6 flex-wrap">
          <div className="bg-blue-200 p-4 rounded shadow w-32 text-center">
            <p className="text-2xl font-bold">{projects.length}</p>
            <p>Proyectos</p>
          </div>
          <div className="bg-yellow-200 p-4 rounded shadow w-32 text-center">
            <p className="text-2xl font-bold">{tasks.length}</p>
            <p>Tareas totales</p>
          </div>
          <div className="bg-red-200 p-4 rounded shadow w-32 text-center">
            <p className="text-2xl font-bold">{pendientes}</p>
            <p>Pendientes</p>
          </div>
          <div className="bg-purple-200 p-4 rounded shadow w-32 text-center">
            <p className="text-2xl font-bold">{completadas}</p>
            <p>Completadas</p>
          </div>
          <div className="bg-green-200 p-4 rounded shadow w-32 text-center">
            <p className="text-2xl font-bold">{enProgreso}</p>
            <p>En progreso</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Últimas tareas</h2>
        {ultimasTareas.length === 0 ? (
          <p>No hay tareas aún.</p>
        ) : (
          <ul className="list-disc ml-6">
            {ultimasTareas.map(({ id, title }) => (
              <li key={id}>{title}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
