import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Project } from "../types/index";

import { fetchProjects } from "../services/ProjectsService";

type ProjectContextType = {
  projects: Project[];
  loading: boolean;
  error: string | null;
  addProject: (project: Omit<Project, "id" | "createdAt">) => void;
  removeProject: (id: number) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const addProject = (project: Omit<Project, "id" | "createdAt">) => {
    const newProject: Project = {
      id: projects.length + 1,
      createdAt: new Date().toISOString(),
      ...project,
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (id: number) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  return (
    <ProjectContext.Provider value={{ projects, loading, error, addProject, removeProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProjects debe usarse dentro de ProjectProvider");
  return context;
}
