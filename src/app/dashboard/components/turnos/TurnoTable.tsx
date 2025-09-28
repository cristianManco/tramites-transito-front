"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Turno, getTurnos, deleteTurno } from "@/libs/services/turnos";
import {
  Calendar,
  Plus,
  Edit3,
  Trash2,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  User,
  HandHeart,
  CalendarDays
} from "lucide-react";
import { Alert } from "@/components/Alerts";
import Loader from "@/components/Loader";

export default function TurnoTable() {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("all");

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
    const { showAlert } = Alert({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "¿Seguro que deseas eliminar este turno?",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      onConfirm: async () => {
        await deleteTurno(id);
        loadTurnos();
      },
    });

    showAlert();
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
    const baseClasses = "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium";
    switch (estado) {
      case "pendiente":
        return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`;
      case "atendido":
        return `${baseClasses} bg-green-100 text-green-800 border border-green-200`;
      case "cancelado":
        return `${baseClasses} bg-red-100 text-red-800 border border-red-200`;
      default:
        return `${baseClasses} bg-slate-100 text-slate-800 border border-slate-200`;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const filteredTurnos = turnos.filter(turno => {
    const matchesSearch =
      turno.asesor?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turno.ciudadano?.nombre?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEstado = estadoFilter === "all" || turno.estado === estadoFilter;
    return matchesSearch && matchesEstado;
  });

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="min-h-screen bg-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-700 rounded-lg">
                <Calendar className="w-6 h-6 text-slate-300" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-white">Gestión de Turnos</h1>
                <p className="text-slate-400 text-sm">
                  {turnos.length} turno{turnos.length !== 1 ? 's' : ''} programado{turnos.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/turnos/create"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg hover:shadow-blue-500/25"
            >
              <Plus className="w-4 h-4" />
              Nuevo Turno
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar por asesor o ciudadano..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Estado Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select
                value={estadoFilter}
                onChange={(e) => setEstadoFilter(e.target.value)}
                className="pl-10 pr-8 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
              >
                <option value="all">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="atendido">Atendido</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden shadow-xl">
          {filteredTurnos.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">
                {searchTerm || estadoFilter !== "all" ? "No se encontraron turnos" : "No hay turnos programados"}
              </h3>
              <p className="text-slate-500 text-sm">
                {searchTerm || estadoFilter !== "all"
                  ? "Intenta ajustar los filtros de búsqueda"
                  : "Comienza programando el primer turno"
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800 border-b border-slate-700">
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Participantes</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Fecha y Hora</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Estado</th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-slate-300">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTurnos.map((turno, index) => {
                    const dateInfo = formatDate(turno.fecha);
                    return (
                      <tr
                        key={turno.id}
                        className={`border-b border-slate-800 hover:bg-slate-800/50 transition-colors ${index % 2 === 0 ? 'bg-slate-900' : 'bg-slate-900/50'
                          }`}
                      >
                        {/* Participantes */}
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            {/* Asesor */}
                            <div className="flex items-center gap-2">
                              <HandHeart className="w-4 h-4 text-blue-400" />
                              <div>
                                <p className="text-sm font-medium text-white">
                                  {turno.asesor?.nombre || "Sin asignar"}
                                </p>
                                <p className="text-xs text-slate-500">Asesor</p>
                              </div>
                            </div>
                            {/* Ciudadano */}
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-green-400" />
                              <div>
                                <p className="text-sm text-slate-300">
                                  {turno.ciudadano?.nombre || "Sin asignar"}
                                </p>
                                <p className="text-xs text-slate-500">Ciudadano</p>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Fecha y Hora */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-slate-400" />
                            <div>
                              <p className="text-sm font-medium text-white">{dateInfo.date}</p>
                              <p className="text-xs text-slate-400">{dateInfo.time}</p>
                            </div>
                          </div>
                        </td>

                        {/* Estado */}
                        <td className="px-6 py-4">
                          <span className={getEstadoBadge(turno.estado)}>
                            {getEstadoIcon(turno.estado)}
                            {turno.estado === "pendiente" ? "Pendiente" :
                              turno.estado === "atendido" ? "Atendido" : "Cancelado"}
                          </span>
                        </td>

                        {/* Acciones */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/dashboard/turnos/edit/${turno.id}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors text-sm"
                            >
                              <Edit3 className="w-3 h-3" />
                              Editar
                            </Link>
                            <button
                              onClick={() => handleDelete(turno.id)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
                            >
                              <Trash2 className="w-3 h-3" />
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {filteredTurnos.length > 0 && (
          <div className="mt-6 flex justify-between items-center text-sm text-slate-400">
            <p>
              Mostrando {filteredTurnos.length} de {turnos.length} turnos
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                {turnos.filter(t => t.estado === "pendiente").length} pendientes
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {turnos.filter(t => t.estado === "atendido").length} atendidos
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                {turnos.filter(t => t.estado === "cancelado").length} cancelados
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}