"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Turno, getTurnoById, updateTurno, createTurno, EstadoTurno } from "@/libs/services/turnos";
import { getUsuarios, Usuario } from "@/libs/services/user";
import {
  Calendar,
  User,
  Save,
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  HandHeart
} from "lucide-react";

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
  const [users, setUsers] = useState<Usuario[]>([]);
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

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "atendido":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "cancelado":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const getEstadoBadge = (estado: string) => {
    const baseClasses = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border";
    switch (estado) {
      case "pendiente":
        return `${baseClasses} bg-yellow-100 text-yellow-800 border-yellow-200`;
      case "atendido":
        return `${baseClasses} bg-green-100 text-green-800 border-green-200`;
      case "cancelado":
        return `${baseClasses} bg-red-100 text-red-800 border-red-200`;
      default:
        return `${baseClasses} bg-slate-100 text-slate-800 border-slate-200`;
    }
  };

  const asesores = users.filter(u => u.role === "asesor");
  const ciudadanos = users.filter(u => u.role === "ciudadano");

  return (
    <div className="min-h-screen bg-slate-800 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/dashboard/turnos")}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a turnos
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-700 rounded-lg">
              <Calendar className="w-6 h-6 text-slate-300" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">
                {id ? "Editar Turno" : "Nuevo Turno"}
              </h1>
              <p className="text-slate-400 text-sm">
                {id ? "Modifica la información del turno" : "Programa una nueva cita"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Asesor Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Asesor asignado
              </label>
              <div className="relative">
                <HandHeart className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <select
                  name="asesor_id"
                  value={form.asesor_id || ""}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
                  required
                >
                  <option value="">Seleccione un asesor</option>
                  {asesores.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} - {u.email}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-slate-500">
                {asesores.length} asesor{asesores.length !== 1 ? 'es' : ''} disponible{asesores.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Ciudadano Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Ciudadano
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <select
                  name="ciudadano_id"
                  value={form.ciudadano_id || ""}
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
                {ciudadanos.length} ciudadano{ciudadanos.length !== 1 ? 's' : ''} registrado{ciudadanos.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Fecha Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Fecha y hora de la cita
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="datetime-local"
                  name="fecha"
                  value={form.fecha || ""}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Estado Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Estado del turno
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  {getEstadoIcon(form.estado || "pendiente")}
                </div>
                <select
                  name="estado"
                  value={form.estado || "pendiente"}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
                >
                  {(["pendiente", "atendido", "cancelado"] as EstadoTurno[]).map((estado) => (
                    <option key={estado} value={estado}>
                      {estado === "pendiente" ? "Pendiente" :
                        estado === "atendido" ? "Atendido" : "Cancelado"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Estado Badge Preview */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Estado actual:</span>
                <span className={getEstadoBadge(form.estado || "pendiente")}>
                  {getEstadoIcon(form.estado || "pendiente")}
                  {form.estado === "pendiente" ? "Pendiente" :
                    form.estado === "atendido" ? "Atendido" : "Cancelado"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => router.push("/dashboard/turnos")}
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
                    {id ? "Actualizar Turno" : "Crear Turno"}
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