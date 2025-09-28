import api from "@/libs/api";

export interface TipoTramite {
  id: number;
  nombre: string;
  descripcion?: string;
}

export async function getTiposTramite(): Promise<TipoTramite[]> {
  const res = await api.get<TipoTramite[]>("/types-tramite/all");
  return res.data;
}

export async function getTipoTramiteById(id: number): Promise<TipoTramite> {
  const res = await api.get<TipoTramite>(`/types-tramite/details/${id}`);
  return res.data;
}

export async function createTipoTramite(tipo: Omit<TipoTramite, "id">) {
  const res = await api.post("/types-tramite/create", tipo);
  return res.data;
}

export async function updateTipoTramite(id: number, tipo: Partial<TipoTramite>) {
  const res = await api.patch(`/types-tramite/update/${id}`, tipo);
  return res.data;
}

export async function deleteTipoTramite(id: number) {
  await api.delete(`/types-tramite/delete/${id}`);
}
