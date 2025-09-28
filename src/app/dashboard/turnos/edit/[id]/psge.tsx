import TurnoForm from "@/app/dashboard/components/turnos/turnosForm";

interface Props {
  params: { id: string };
}

export default function EditTurnoPage({ params }: Props) {
  const id = Number(params.id);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Editar Turno</h2>
      <TurnoForm id={id} />
    </div>
  );
}
