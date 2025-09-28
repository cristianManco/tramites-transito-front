import TurnoForm from "@/app/dashboard/components/turnos/turnosForm";

interface Props {
  params: { id: string };
}

export default function EditTurnoPage({ params }: Props) {
  const id = Number(params.id);
  return (
    <TurnoForm id={id} />
  );
}
