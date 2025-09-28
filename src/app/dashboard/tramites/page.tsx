"use client";

import { useTramites, Tramite } from "@/hooks/useTramites";
import { useEffect, useState } from "react";
import TramiteForm from "../components/tramites/tramitesForm";
import TramiteTable from "../components/tramites/tramitesTable";
import { getTiposTramite, TipoTramite } from "@/libs/services/type-tramites";
import { FileText, Plus, Activity } from "lucide-react";
import Loader from "@/components/Loader";
import { Alert } from "@/components/Alerts";

export default function TramitesPage() {
  const [tipos, setTipos] = useState<TipoTramite[]>([]);
  const {
    tramites,
    usuarios,
    loading,
    createTramite,
    updateTramite,
    deleteTramite,
  } = useTramites();

  useEffect(() => {
    loadTipos();
  }, []);

  const loadTipos = async () => {
    const data = await getTiposTramite();
    setTipos(data);
  };

  const [editing, setEditing] = useState<Tramite | null>(null);
  const [adding, setAdding] = useState(false);

  const handleDelete = async (id: number) => {
    const { showAlert } = Alert({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "¿Seguro que deseas eliminar este trámite?",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      onConfirm: async () => {
        await deleteTramite(id);
      },
    });

    showAlert();
  };

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="min-h-screen bg-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-700 rounded-lg">
              <Activity className="w-6 h-6 text-slate-300" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">
                Gestión de Trámites
              </h1>
              <p className="text-slate-400 text-sm">
                {tramites.length} trámite
                {tramites.length !== 1 ? "s" : ""} en el sistema
              </p>
            </div>
          </div>
          <button
            onClick={() => setAdding(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg hover:shadow-blue-500/25"
          >
            <Plus className="w-4 h-4" />
            Nuevo Trámite
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FileText className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Pendientes</p>
                <p className="text-xl font-semibold text-white">
                  {tramites.filter((t) => t.estado === "pendiente").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-400">En Proceso</p>
                <p className="text-xl font-semibold text-white">
                  {tramites.filter((t) => t.estado === "en_proceso").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Completados</p>
                <p className="text-xl font-semibold text-white">
                  {tramites.filter((t) => t.estado === "completado").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <FileText className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Cancelados</p>
                <p className="text-xl font-semibold text-white">
                  {tramites.filter((t) => t.estado === "cancelado").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <TramiteTable
          tramites={tramites}
          onEdit={(t) => setEditing(t)}
          onDelete={handleDelete}
        />

        {(adding || editing) && (
          <TramiteForm
            initialData={editing ?? {}}
            usuarios={usuarios}
            tipos={tipos}
            onSubmit={async (data) => {
              if (editing) {
                await updateTramite(editing.id, data);
                setEditing(null);
              } else {
                await createTramite(data);
                setAdding(false);
              }
            }}
            onCancel={() => {
              setAdding(false);
              setEditing(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
