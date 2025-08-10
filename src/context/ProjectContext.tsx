import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Project } from "../types/index";

type ProjectContextType = {
  projects: Project[];
  addProject: (project: Omit<Project, "id" | "createdAt">) => void;
  removeProject: (id: number) => void;
  updateProject: (updated: Project) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Proyecto Demo",
      description: "Proyecto de ejemplo para probar",
      createdAt: new Date().toISOString(),
    },
  ]);

  // Carga inicial (podría venir de localStorage o API)
  useEffect(() => {
    const stored = localStorage.getItem("projects");
    if (stored) setProjects(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  function addProject(project: Omit<Project, "id" | "createdAt">) {
    const newProject: Project = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...project,
    };
    setProjects((prev) => [...prev, newProject]);
  }

  function removeProject(id: number) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  function updateProject(updated: Project) {
    setProjects((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  }

  return (
    <ProjectContext.Provider
      value={{ projects, addProject, removeProject, updateProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProjects debe usarse dentro de ProjectProvider");
  return context;
}
