"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Turno, getTurnos, deleteTurno } from "@/libs/services/turnos";

export default function TurnoTable() {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTurnos();
  }, []);

  const loadTurnos = async () => {
    setLoading(true);
    const data = await getTurnos();
    setTurnos(data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este turno?")) {
      await deleteTurno(id);
      loadTurnos();
    }
  };

  if (loading) return <p>Cargando turnos...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Turnos</h2>
        <Link
          href="/dashboard/turnos/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Nuevo Turno
        </Link>
      </div>
      <table className="w-full border-collapse border border-slate-300">
        <thead>
          <tr className="bg-slate-100">
            <th className="border px-3 py-2">Asesor</th>
            <th className="border px-3 py-2">Ciudadano</th>
            <th className="border px-3 py-2">Fecha</th>
            <th className="border px-3 py-2">Estado</th>
            <th className="border px-3 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnos.map((t) => (
            <tr key={t.id} className="hover:bg-slate-50">
              <td className="border px-3 py-2">{t.asesor?.nombre || "-"}</td>
              <td className="border px-3 py-2">{t.ciudadano?.nombre || "-"}</td>
              <td className="border px-3 py-2">
                {new Date(t.fecha).toLocaleString()}
              </td>
              <td className="border px-3 py-2 capitalize">{t.estado}</td>
              <td className="border px-3 py-2 flex gap-2">
                <Link
                  href={`/dashboard/turnos/edit/${t.id}`}
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
          {turnos.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-slate-500">
                No hay turnos registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
