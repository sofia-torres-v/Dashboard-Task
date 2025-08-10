export type User = {
  id: number;
  username: string;
  token: string;
};

export async function loginUser(username: string, password: string): Promise<User> {
  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Credenciales inválidas");
  const data = await res.json();
  console.log("Login response data:", data);

  return { id: data.id, username: data.username, token: data.token };
}
