"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TipoTramite, getTipoTramiteById, updateTipoTramite, createTipoTramite } from "@/libs/services/type-tramites";
import {
  FileText,
  Type,
  AlignLeft,
  Save,
  ArrowLeft,
  Tag
} from "lucide-react";

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
    <div className="min-h-screen bg-slate-800 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/dashboard/tipos-tramites")}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a tipos de trámite
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-700 rounded-lg">
              <FileText className="w-6 h-6 text-slate-300" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">
                {id ? "Editar Tipo de Trámite" : "Nuevo Tipo de Trámite"}
              </h1>
              <p className="text-slate-400 text-sm">
                {id ? "Modifica la información del tipo de trámite" : "Define un nuevo tipo de trámite para el sistema"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Nombre Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Nombre del trámite
              </label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  name="nombre"
                  value={form.nombre || ""}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Ej: Certificado de residencia, Permiso de construcción..."
                  required
                />
              </div>
              <p className="text-xs text-slate-500">
                Nombre descriptivo y claro del tipo de trámite
              </p>
            </div>

            {/* Descripción Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Descripción
              </label>
              <div className="relative">
                <AlignLeft className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                <textarea
                  name="descripcion"
                  value={form.descripcion || ""}
                  onChange={handleChange}
                  rows={4}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Describe los detalles, requisitos o características del trámite..."
                />
              </div>
              <p className="text-xs text-slate-500">
                Información adicional sobre el trámite (opcional)
              </p>
            </div>

            {/* Preview Card */}
            {(form.nombre || form.descripcion) && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Vista previa
                </label>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Tag className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">
                        {form.nombre || "Nombre del trámite"}
                      </h3>
                      {form.descripcion && (
                        <p className="text-slate-400 text-sm mt-1">
                          {form.descripcion}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => router.push("/dashboard/tipos-tramites")}
                className="flex-1 px-4 py-3 text-slate-400 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-slate-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {id ? "Actualizar Tipo de Trámite" : "Crear Tipo de Trámite"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}