import api from "@/libs/api";

export interface Usuario {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: "asesor" | "ciudadano" | "admin";
  activo: boolean;
}

export async function getUsuarios(): Promise<Usuario[]> {
  const res = await api.get<Usuario[]>("/users/all");
  return res.data;
}

export async function getUsuarioById(id: number): Promise<Usuario> {
  const res = await api.get<Usuario>(`/users/details/${id}`);
  return res.data;
}

export async function createUsuario(usuario: Omit<Usuario, "id_usuario">) {
  const res = await api.post("/users/create", usuario);
  return res.data;
}

export async function updateUsuario(id: number, usuario: Partial<Usuario>) {
  const res = await api.patch(`/users/update/${id}`, usuario);
  return res.data;
}

export async function deleteUsuario(id: number) {
  await api.delete(`/users/delete${id}`);
}
