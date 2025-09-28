"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Usuario, getUsuarioById, updateUsuario, createUsuario } from "@/libs/services/user";

interface Props {
    id?: number;
}

export default function UserForm({ id }: Props) {
    const [form, setForm] = useState<Partial<Usuario>>({
        name: "",
        email: "",
        role: "asesor",
        activo: true,
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (id) {
            getUsuarioById(id).then((data) => setForm(data));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await updateUsuario(id, form);
            } else {
                await createUsuario(form as Usuario);
            }
            router.push("/dashboard/users");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
            <div>
                <label className="block mb-1">Nombre</label>
                <input
                    name="name"
                    value={form.name || ""}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                />
            </div>

            <div>
                <label className="block mb-1">Correo</label>
                <input
                    type="email"
                    name="email"
                    value={form.email || ""}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    required
                />
            </div>

            {!id && (
                <div>
                    <label className="block mb-1">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password || ""}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
            )}

            <div>
                <label className="block mb-1">Rol</label>
                <select
                    name="role"
                    value={form.role || "asesor"}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                >
                    <option value="asesor">Asesor</option>
                    <option value="ciudadano">Ciudadano</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="activo"
                    checked={form.activo ?? true}
                    onChange={handleChange}
                />
                <label>Activo</label>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {loading ? "Guardando..." : id ? "Actualizar" : "Crear"}
            </button>
        </form>
    );
}
