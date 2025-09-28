import UserForm from "@/app/dashboard/components/users/useForm";

interface Props {
  params: { id: string };
}

export default function EditUsuarioPage({ params }: Props) {
  const id = Number(params.id);
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
      <UserForm id={id} />
    </div>
  );
}
