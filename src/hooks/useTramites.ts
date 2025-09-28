"use client";

import { useState, useEffect } from "react";

export interface Tramite {
  id: number;
  usuario_id: number;
  tipo_id: number;
  estado: string;
  fecha_inicio: string;
  fecha_fin?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  datos_extra?: Record<string, any>;
}

export interface Usuario {
  id: number;
  name: string;
  email: string;
}

export interface TipoTramite {
  id: number;
  nombre: string;
  descripcion?: string;
}

export function useTramites() {
  const [tramites, setTramites] = useState<Tramite[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [tipos, setTipos] = useState<TipoTramite[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTramites = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tramites/all`);
      const data = await res.json();
      setTramites(data);
    } catch (error) {
      console.error("Error cargando trámites", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/all`);
      setUsuarios(await res.json());
    } catch (error) {
      console.error("Error cargando usuarios", error);
    }
  };

  const fetchTipos = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tipo-tramites/all`);
      setTipos(await res.json());
    } catch (error) {
      console.error("Error cargando tipos de trámite", error);
    }
  };

  const createTramite = async (nuevo: Partial<Tramite>) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tramites/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    });
    await fetchTramites();
    return res.json();
  };

  const updateTramite = async (id: number, cambios: Partial<Tramite>) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tramites/update/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cambios),
    });
    await fetchTramites();
    return res.json();
  };

  const deleteTramite = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tramites/delete/${id}`, {
      method: "DELETE",
    });
    await fetchTramites();
  };

  const detailsTramite = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tramites/delete/${id}`,);
    await fetchTramites();
  };

  useEffect(() => {
    fetchTramites();
    fetchUsuarios();
    fetchTipos();
  }, []);

  return { tramites, usuarios, tipos, loading, createTramite, updateTramite, deleteTramite, detailsTramite };
}
