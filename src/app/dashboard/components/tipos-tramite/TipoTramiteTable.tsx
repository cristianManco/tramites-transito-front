"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TipoTramite, getTiposTramite, deleteTipoTramite } from "@/libs/services/type-tramites";

export default function TipoTramiteTable() {
  const [tipos, setTipos] = useState<TipoTramite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTipos();
  }, []);

  const loadTipos = async () => {
    setLoading(true);
    const data = await getTiposTramite();
    setTipos(data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este tipo de trámite?")) {
      await deleteTipoTramite(id);
      loadTipos();
    }
  };

  if (loading) return <p>Cargando tipos de trámite...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Tipos de Trámite</h2>
        <Link
          href="/dashboard/tipos-tramites/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nuevo Tipo
        </Link>
      </div>
      <table className="w-full border-collapse border border-slate-300">
        <thead>
          <tr className="bg-slate-100">
            <th className="border px-3 py-2 text-left">Nombre</th>
            <th className="border px-3 py-2 text-left">Descripción</th>
            <th className="border px-3 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map((t) => (
            <tr key={t.id} className="hover:bg-slate-50">
              <td className="border px-3 py-2">{t.nombre}</td>
              <td className="border px-3 py-2">{t.descripcion || "-"}</td>
              <td className="border px-3 py-2 flex gap-2">
                <Link
                  href={`/dashboard/tipos-tramite/edit/${t.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {tipos.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-4 text-slate-500">
                No hay tipos de trámite registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
