"use client";

import { Tramite } from "@/hooks/useTramites";
import {
  Edit3,
  Trash2,
  Search,
  Filter,
  FileText,
  User,
  Clock,
  CheckCircle,
  XCircle,
  PlayCircle,
  Calendar,
  Hash
} from "lucide-react";
import { useState } from "react";

interface Props {
  tramites: Tramite[];
  onEdit: (tramite: Tramite) => void;
  onDelete: (id: number) => void;
}

export default function TramiteTable({ tramites, onEdit, onDelete }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("all");

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
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const getEstadoBadge = (estado: string) => {
    const baseClasses = "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium";
    switch (estado) {
      case "pendiente":
        return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`;
      case "en_proceso":
        return `${baseClasses} bg-blue-100 text-blue-800 border border-blue-200`;
      case "completado":
        return `${baseClasses} bg-green-100 text-green-800 border border-green-200`;
      case "cancelado":
        return `${baseClasses} bg-red-100 text-red-800 border border-red-200`;
      default:
        return `${baseClasses} bg-slate-100 text-slate-800 border border-slate-200`;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const filteredTramites = tramites.filter(tramite => {
    const matchesSearch =
      tramite.id.toString().includes(searchTerm) ||
      (tramite.usuario_id && tramite.usuario_id.toString().includes(searchTerm)) ||
      (tramite.tipo_id && tramite.tipo_id.toString().includes(searchTerm));
    const matchesEstado = estadoFilter === "all" || tramite.estado === estadoFilter;
    return matchesSearch && matchesEstado;
  });

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar por ID, usuario o tipo..."
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
              <option value="en_proceso">En Proceso</option>
              <option value="completado">Completado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden shadow-xl">
        {filteredTramites.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-300 mb-2">
              {searchTerm || estadoFilter !== "all" ? "No se encontraron trámites" : "No hay trámites registrados"}
            </h3>
            <p className="text-slate-500 text-sm">
              {searchTerm || estadoFilter !== "all"
                ? "Intenta ajustar los filtros de búsqueda"
                : "Los trámites aparecerán aquí una vez que se registren"
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-800 border-b border-slate-700">
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">ID</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Usuario</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Tipo</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Estado</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Fechas</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-slate-300">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredTramites.map((tramite, index) => (
                  <tr
                    key={tramite.id}
                    className={`border-b border-slate-800 hover:bg-slate-800/50 transition-colors ${index % 2 === 0 ? 'bg-slate-900' : 'bg-slate-900/50'
                      }`}
                  >
                    {/* ID */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-slate-500" />
                        <span className="font-mono text-sm text-white">{tramite.id}</span>
                      </div>
                    </td>

                    {/* Usuario */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-300">ID: {tramite.usuario_id}</span>
                      </div>
                    </td>

                    {/* Tipo */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-300">ID: {tramite.tipo_id}</span>
                      </div>
                    </td>

                    {/* Estado */}
                    <td className="px-6 py-4">
                      <span className={getEstadoBadge(tramite.estado)}>
                        {getEstadoIcon(tramite.estado)}
                        {tramite.estado === "pendiente" ? "Pendiente" :
                          tramite.estado === "en_proceso" ? "En Proceso" :
                            tramite.estado === "completado" ? "Completado" : "Cancelado"}
                      </span>
                    </td>

                    {/* Fechas */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Calendar className="w-3 h-3" />
                          <span>Inicio:</span>
                          <span className="text-slate-300">{formatDate(tramite.fecha_inicio)}</span>
                        </div>
                        {tramite.fecha_fin && (
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Calendar className="w-3 h-3" />
                            <span>Fin:</span>
                            <span className="text-slate-300">{formatDate(tramite.fecha_fin)}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Acciones */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit(tramite)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors text-sm"
                        >
                          <Edit3 className="w-3 h-3" />
                          Editar
                        </button>
                        <button
                          onClick={() => onDelete(tramite.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
                        >
                          <Trash2 className="w-3 h-3" />
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      {filteredTramites.length > 0 && (
        <div className="flex justify-between items-center text-sm text-slate-400">
          <p>
            Mostrando {filteredTramites.length} de {tramites.length} trámites
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              {tramites.filter(t => t.estado === "pendiente").length} pendientes
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              {tramites.filter(t => t.estado === "en_proceso").length} en proceso
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              {tramites.filter(t => t.estado === "completado").length} completados
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              {tramites.filter(t => t.estado === "cancelado").length} cancelados
            </span>
          </div>
        </div>
      )}
    </div>
  );
}