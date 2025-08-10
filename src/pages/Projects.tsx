import ProjectList from "../components/ui/ProjectList";

export default function Projects() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mis Proyectos</h1>
      <h2 className="text-xl font-semibold mb-6">Aquí encuentras todos tus proyectos</h2>
      <ProjectList />
    </div>
  );
}
