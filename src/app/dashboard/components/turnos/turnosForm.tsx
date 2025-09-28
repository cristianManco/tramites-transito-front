"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Turno, getTurnoById, updateTurno, createTurno, EstadoTurno } from "@/libs/services/turnos";
import { getUsuarios } from "@/libs/services/user";

interface Props {
  id?: number;
}

export default function TurnoForm({ id }: Props) {
  const [form, setForm] = useState<Partial<Turno>>({
    asesor_id: 0,
    ciudadano_id: 0,
    fecha: "",
    estado: "pendiente",
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadUsers();
    if (id) {
      getTurnoById(id).then((data) => setForm(data));
    }
  }, [id]);

  const loadUsers = async () => {
    const data = await getUsuarios();
    setUsers(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateTurno(id, form);
      } else {
        await createTurno(form as Omit<Turno, "id">);
      }
      router.push("/dashboard/turnos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block mb-1">Asesor</label>
        <select
          name="asesor_id"
          value={form.asesor_id || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Seleccione asesor</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nombre} ({u.role})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Ciudadano</label>
        <select
          name="ciudadano_id"
          value={form.ciudadano_id || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Seleccione ciudadano</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nombre} ({u.role})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1">Fecha</label>
        <input
          type="datetime-local"
          name="fecha"
          value={form.fecha || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Estado</label>
        <select
          name="estado"
          value={form.estado || "pendiente"}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          {(["pendiente", "atendido", "cancelado"] as EstadoTurno[]).map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Guardando..." : id ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
}
