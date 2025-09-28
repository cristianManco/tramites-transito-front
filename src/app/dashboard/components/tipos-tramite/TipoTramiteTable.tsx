"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TipoTramite, getTiposTramite, deleteTipoTramite } from "@/libs/services/type-tramites";
import {
  FileText,
  Plus,
  Edit3,
  Trash2,
  Search,
  Tag,
  AlignLeft,
  Layers
} from "lucide-react";
import { Alert } from "@/components/Alerts";

export default function TipoTramiteTable() {
  const [tipos, setTipos] = useState<TipoTramite[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadTipos();
  }, []);

  const loadTipos = async () => {
    setLoading(true);
    const data = await getTiposTramite();
    setTipos(data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    const { showAlert } = Alert({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "¿Seguro que deseas eliminar este tipo de trámite?",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      onConfirm: async () => {
        await deleteTipoTramite(id);
        loadTipos();
      },
    });
    showAlert();
  };

  const filteredTipos = tipos.filter(tipo =>
    tipo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tipo.descripcion && tipo.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-800 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-400">Cargando tipos de trámite...</p>
            </div>
          </div>
        </div>
      </div>
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
                <Layers className="w-6 h-6 text-slate-300" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-white">Tipos de Trámite</h1>
                <p className="text-slate-400 text-sm">
                  {tipos.length} tipo{tipos.length !== 1 ? 's' : ''} de trámite configurado{tipos.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/tipos-tramites/create"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg hover:shadow-blue-500/25"
            >
              <Plus className="w-4 h-4" />
              Nuevo Tipo
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar tipos de trámite..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden shadow-xl">
          {filteredTipos.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">
                {searchTerm ? "No se encontraron tipos de trámite" : "No hay tipos de trámite configurados"}
              </h3>
              <p className="text-slate-500 text-sm">
                {searchTerm
                  ? "Intenta con otros términos de búsqueda"
                  : "Comienza creando el primer tipo de trámite para el sistema"
                }
              </p>
            </div>
          ) : (
            <div className="grid gap-4 p-6">
              {filteredTipos.map((tipo, index) => (
                <div
                  key={tipo.id}
                  className={`bg-slate-800 border border-slate-700 rounded-lg p-4 hover:bg-slate-800/80 transition-colors ${index % 2 === 0 ? 'border-slate-700' : 'border-slate-700/70'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Icon */}
                      <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                        <Tag className="w-5 h-5 text-blue-600" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {tipo.nombre}
                        </h3>
                        {tipo.descripcion ? (
                          <div className="flex items-start gap-2 mb-3">
                            <AlignLeft className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                            <p className="text-slate-400 text-sm leading-relaxed">
                              {tipo.descripcion}
                            </p>
                          </div>
                        ) : (
                          <p className="text-slate-500 text-sm mb-3 italic">
                            Sin descripción
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4">
                      <Link
                        href={`/dashboard/tipos-tramite/edit/${tipo.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors text-sm"
                      >
                        <Edit3 className="w-3 h-3" />
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(tipo.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
                      >
                        <Trash2 className="w-3 h-3" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {filteredTipos.length > 0 && (
          <div className="mt-6 flex justify-between items-center text-sm text-slate-400">
            <p>
              Mostrando {filteredTipos.length} de {tipos.length} tipos de trámite
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {tipos.filter(t => t.descripcion).length} con descripción
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                {tipos.filter(t => !t.descripcion).length} sin descripción
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}