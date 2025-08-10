import { useProjects } from "../../context/ProjectContext";

export default function ProjectList() {
  const { projects, removeProject } = useProjects();

  if (projects.length === 0) return <p>No tienes proyectos creados.</p>;

  return (
    <ul className="flex flex-wrap justify-between">
      {projects.map(({ id, name, description }) => (
        <li key={id} className="mb-3 p-5 border rounded shadow-sm  w-[260px]">
          <h3 className="font-bold text-lg">{name}</h3>
          {description && <p className="text-gray-600">{description}</p>}
          <button
            onClick={() => removeProject(id)}
            className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}
