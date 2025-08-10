export type Project = {
  id: number;
  name: string;
  description?: string;
  createdAt: string; // fecha ISO
};

export type Task = {
  id: number;
  projectId: number;
  title: string;
  description?: string;
  status: "Pendiente" | "En progreso" | "Completada";
  createdAt: string;
  dueDate?: string;
};

export type TaskStatus = "Pendiente" | "En progreso" | "Completada";
