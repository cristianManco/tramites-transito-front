import TipoTramiteForm from "@/app/dashboard/components/tipos-tramite/tipoTramiteForm";

interface Props {
  params: { id: string };
}

export default function EditTipoTramitePage({ params }: Props) {
  const id = Number(params.id);
  return (
    <TipoTramiteForm id={id} />
  );
}
