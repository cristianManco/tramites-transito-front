"use client";

import { useTramites, Tramite } from "@/hooks/useTramites";
import { useState } from "react";
import TramiteForm from "../components/tramites/tramitesForm";
import TramiteTable from "../components/tramites/tramitesTable";

export default function TramitesPage() {
  const { tramites, usuarios, tipos, loading, createTramite, updateTramite, deleteTramite } =
    useTramites();

  const [editing, setEditing] = useState<Tramite | null>(null);
  const [adding, setAdding] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Trámites</h1>
        <button
          onClick={() => setAdding(true)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + Nuevo Trámite
        </button>
      </div>

      {loading ? (
        <p>Cargando trámites...</p>
      ) : (
        <TramiteTable
          tramites={tramites}
          onEdit={(t) => setEditing(t)}
          onDelete={deleteTramite}
        />
      )}

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
  );
}
