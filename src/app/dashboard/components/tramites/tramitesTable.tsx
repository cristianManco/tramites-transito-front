"use client";

import { Tramite } from "@/hooks/useTramites";


interface Props {
  tramites: Tramite[];
  onEdit: (tramite: Tramite) => void;
  onDelete: (id: number) => void;
}

export default function TramiteTable({ tramites, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50 text-gray-700 text-sm">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Usuario</th>
            <th className="px-4 py-2">Tipo</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Fecha Inicio</th>
            <th className="px-4 py-2">Fecha Fin</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tramites.map((t) => (
            <tr key={t.id} className="text-sm border-b">
              <td className="px-4 py-2">{t.id}</td>
              <td className="px-4 py-2">{t.usuario_id}</td>
              <td className="px-4 py-2">{t.tipo_id}</td>
              <td className="px-4 py-2">{t.estado}</td>
              <td className="px-4 py-2">{new Date(t.fecha_inicio).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                {t.fecha_fin ? new Date(t.fecha_fin).toLocaleDateString() : "-"}
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => onEdit(t)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(t.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {tramites.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No hay trámites registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
