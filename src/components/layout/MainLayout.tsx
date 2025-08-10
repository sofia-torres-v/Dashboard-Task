import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function MainLayout() {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4 h-screen flex flex-col relative">
        {/* Menú scrollable si crece mucho */}
        <div className="overflow-y-auto flex-1 mb-16">
          <h2 className="text-xl font-bold mb-4">Panel</h2>
          <nav className="flex flex-col gap-2">
            <Link to="/" className="hover:bg-gray-700 p-2 rounded">
              Dashboard
            </Link>
            <Link to="/projects" className="hover:bg-gray-700 p-2 rounded">
              Proyectos
            </Link>
            <Link to="/tasks" className="hover:bg-gray-700 p-2 rounded">
              Tareas
            </Link>
          </nav>
        </div>

        {/* Botón siempre visible abajo */}
        <button
          onClick={logout}
          className="absolute bottom-4 left-4 right-4 bg-red-600 hover:bg-red-700 transition rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Contenido principal scrollable */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto max-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
