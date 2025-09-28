"use client";

import { Tramite, Usuario, TipoTramite } from "@/hooks/useTramites";
import { useState } from "react";

interface Props {
  initialData?: Partial<Tramite>;
  usuarios: Usuario[];
  tipos: TipoTramite[];
  onSubmit: (data: Partial<Tramite>) => void;
  onCancel: () => void;
}

export default function TramiteForm({
  initialData = {},
  usuarios,
  tipos,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState<Partial<Tramite>>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="p-4 bg-gray-50 rounded shadow-md space-y-4"
    >
      {/* Usuario */}
      <div>
        <label className="block text-sm">Usuario</label>
        <select
          name="usuario_id"
          value={form.usuario_id ?? ""}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Seleccione un ciudadano</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>
      </div>

      {/* Tipo de trámite */}
      <div>
        <label className="block text-sm">Tipo de Trámite</label>
        <select
          name="tipo_id"
          value={form.tipo_id ?? ""}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Seleccione un tipo</option>
          {tipos.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Estado */}
      <div>
        <label className="block text-sm">Estado</label>
        <select
          name="estado"
          value={form.estado ?? ""}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Seleccione</option>
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En Proceso</option>
          <option value="completado">Completado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      {/* Botones */}
      <div className="flex gap-3">
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
