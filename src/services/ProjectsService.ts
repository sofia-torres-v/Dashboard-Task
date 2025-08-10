export type Project = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
};

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch("https://dummyjson.com/users");
  if (!res.ok) throw new Error("Error al cargar proyectos");
  const data = await res.json();
  console.log("Datos usuarios:", data); 

  return data.users.map((user: any) => ({
    id: user.id,
    name: `${user.firstName}'s Project`,
    description: `Proyecto de ${user.firstName}`,
    createdAt: new Date().toISOString(),
  }));
}
