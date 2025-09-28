"use client";

import { Tramite } from "@/hooks/useTramites";
import { TipoTramite } from "@/libs/services/type-tramites";
import { Usuario } from "@/libs/services/user";
import { useState } from "react";
import {
  User,
  FileText,
  Activity,
  Save,
  X,
  Clock,
  CheckCircle,
  XCircle,
  PlayCircle
} from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(form);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "en_proceso":
        return <PlayCircle className="w-4 h-4 text-blue-500" />;
      case "completado":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "cancelado":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-slate-500" />;
    }
  };

  const getEstadoBadge = (estado: string) => {
    const baseClasses = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border";
    switch (estado) {
      case "pendiente":
        return `${baseClasses} bg-yellow-100 text-yellow-800 border-yellow-200`;
      case "en_proceso":
        return `${baseClasses} bg-blue-100 text-blue-800 border-blue-200`;
      case "completado":
        return `${baseClasses} bg-green-100 text-green-800 border-green-200`;
      case "cancelado":
        return `${baseClasses} bg-red-100 text-red-800 border-red-200`;
      default:
        return `${baseClasses} bg-slate-100 text-slate-800 border-slate-200`;
    }
  };

  const ciudadanos = usuarios.filter(u => u.role === "ciudadano");

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-700 rounded-lg">
            <FileText className="w-5 h-5 text-slate-300" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">
              {initialData.id ? "Editar Trámite" : "Nuevo Trámite"}
            </h2>
            <p className="text-slate-400 text-sm">
              {initialData.id ? "Modifica la información del trámite" : "Completa los datos del nuevo trámite"}
            </p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="p-2 text-slate-400 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Usuario Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Ciudadano solicitante
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
            <select
              name="usuario_id"
              value={form.usuario_id ?? ""}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
              required
            >
              <option value="">Seleccione un ciudadano</option>
              {ciudadanos.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} - {u.email}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs text-slate-500">
            {ciudadanos.length} ciudadano{ciudadanos.length !== 1 ? 's' : ''} disponible{ciudadanos.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Tipo de trámite Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Tipo de trámite
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
            <select
              name="tipo_id"
              value={form.tipo_id ?? ""}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
              required
            >
              <option value="">Seleccione un tipo de trámite</option>
              {tipos.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Mostrar descripción del tipo seleccionado */}
          {form.tipo_id && (
            <div className="mt-2 p-3 bg-slate-800 border border-slate-700 rounded-lg">
              <div className="text-xs text-slate-400 mb-1">Descripción del trámite:</div>
              <div className="text-sm text-slate-300">
                {tipos.find(t => t.id === Number(form.tipo_id))?.descripcion || "Sin descripción disponible"}
              </div>
            </div>
          )}
        </div>

        {/* Estado Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Estado del trámite
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {getEstadoIcon(form.estado || "pendiente")}
            </div>
            <select
              name="estado"
              value={form.estado ?? ""}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
              required
            >
              <option value="">Seleccione un estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="en_proceso">En Proceso</option>
              <option value="completado">Completado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>

          {/* Estado Badge Preview */}
          {form.estado && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Estado actual:</span>
              <span className={getEstadoBadge(form.estado)}>
                {getEstadoIcon(form.estado)}
                {form.estado === "pendiente" ? "Pendiente" :
                  form.estado === "en_proceso" ? "En Proceso" :
                    form.estado === "completado" ? "Completado" : "Cancelado"}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-3 text-slate-400 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-slate-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {initialData.id ? "Actualizar Trámite" : "Crear Trámite"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}