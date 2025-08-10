import AddProjectForm from "../components/ui/AddProjectForm";
import ProjectList from "../components/ui/ProjectList";

export default function Projects() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mis Proyectos</h1>
      <AddProjectForm />
      <ProjectList />
    </div>
  );
}
