import UserForm from "@/app/dashboard/components/users/useForm";

interface Props {
  params: { id: string };
}

export default function EditUsuarioPage({ params }: Props) {
  const id = Number(params.id);
  return (
    <UserForm id={id} />
  );
}
