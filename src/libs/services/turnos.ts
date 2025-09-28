import api from "@/libs/api";

export type EstadoTurno = "pendiente" | "atendido" | "cancelado";

export interface Turno {
  id: number;
  asesor_id: number;
  ciudadano_id: number;
  fecha: string; // ISO
  estado: EstadoTurno;
  asesor?: { id: number; nombre: string; email: string };
  ciudadano?: { id: number; nombre: string; email: string };
}

export async function getTurnos(): Promise<Turno[]> {
  const res = await api.get<Turno[]>("/turnos/all");
  return res.data;
}

export async function getTurnoById(id: number): Promise<Turno> {
  const res = await api.get<Turno>(`/turnos/details${id}`);
  return res.data;
}

export async function createTurno(turno: Omit<Turno, "id">) {
  const res = await api.post("/turnos/create", turno);
  return res.data;
}

export async function updateTurno(id: number, turno: Partial<Turno>) {
  const res = await api.patch(`/turnos/update/${id}`, turno);
  return res.data;
}

export async function deleteTurno(id: number) {
  await api.delete(`/turnos/delete/${id}`);
}
