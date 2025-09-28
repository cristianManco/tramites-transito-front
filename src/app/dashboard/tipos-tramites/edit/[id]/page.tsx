import TipoTramiteForm from "@/app/dashboard/components/tipos-tramite/tipoTramiteForm";

interface Props {
  params: { id: string };
}

export default function EditTipoTramitePage({ params }: Props) {
  const id = Number(params.id);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Editar Tipo de Trámite</h2>
      <TipoTramiteForm id={id} />
    </div>
  );
}
