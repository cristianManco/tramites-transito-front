"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TipoTramite, getTipoTramiteById, updateTipoTramite, createTipoTramite } from "@/libs/services/type-tramites";

interface Props {
  id?: number;
}

export default function TipoTramiteForm({ id }: Props) {
  const [form, setForm] = useState<Partial<TipoTramite>>({
    nombre: "",
    descripcion: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      getTipoTramiteById(id).then((data) => setForm(data));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateTipoTramite(id, form);
      } else {
        await createTipoTramite(form as TipoTramite);
      }
      router.push("/dashboard/tipos-tramites");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block mb-1">Nombre</label>
        <input
          name="nombre"
          value={form.nombre || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Descripción</label>
        <textarea
          name="descripcion"
          value={form.descripcion || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          rows={3}
        />
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
