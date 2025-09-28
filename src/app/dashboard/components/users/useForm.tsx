"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Usuario, getUsuarioById, updateUsuario, createUsuario } from "@/libs/services/user";
import { User, Mail, Lock, UserCheck, Save, ArrowLeft } from "lucide-react";

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

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case "admin":
                return "bg-red-100 text-red-800 border-red-200";
            case "asesor":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "ciudadano":
                return "bg-green-100 text-green-800 border-green-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <div className="min-h-screen bg-slate-800 p-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => router.push("/dashboard/users")}
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-300 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a usuarios
                    </button>

                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-slate-800 rounded-lg">
                            <User className="w-6 h-6 text-slate-300" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-white">
                                {id ? "Editar Usuario" : "Nuevo Usuario"}
                            </h1>
                            <p className="text-slate-400 text-sm">
                                {id ? "Modifica la información del usuario" : "Completa los datos para crear un nuevo usuario"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Form Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Name Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">
                                Nombre completo
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    name="name"
                                    value={form.name || ""}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Ingresa el nombre completo"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">
                                Correo electrónico
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email || ""}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="correo@ejemplo.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field - Only for new users */}
                        {!id && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-300">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password || ""}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Crea una contraseña segura"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-slate-500">Mínimo 6 caracteres</p>
                            </div>
                        )}

                        {/* Role Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">
                                Rol del usuario
                            </label>
                            <div className="relative">
                                <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <select
                                    name="role"
                                    value={form.role || "asesor"}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
                                >
                                    <option value="asesor">Asesor</option>
                                    <option value="ciudadano">Ciudadano</option>
                                    <option value="admin">Administrador</option>
                                </select>
                            </div>

                            {/* Role Badge */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500">Rol seleccionado:</span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeColor(form.role || "asesor")}`}>
                                    {form.role === "admin" && "👑 "}
                                    {form.role === "asesor" && "🤝 "}
                                    {form.role === "ciudadano" && "👤 "}
                                    {form.role === "admin" ? "Administrador" :
                                        form.role === "asesor" ? "Asesor" : "Ciudadano"}
                                </span>
                            </div>
                        </div>

                        {/* Active Status */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">
                                Estado del usuario
                            </label>
                            <div className="flex items-center justify-between p-4 bg-slate-800 border border-slate-700 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${form.activo ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <div>
                                        <p className="text-sm text-white font-medium">
                                            {form.activo ? "Usuario activo" : "Usuario inactivo"}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {form.activo ? "El usuario puede acceder al sistema" : "El usuario no puede acceder al sistema"}
                                        </p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="activo"
                                        checked={form.activo ?? true}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="relative w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4 border-t border-slate-800">
                            <button
                                type="button"
                                onClick={() => router.push("/dashboard/users")}
                                className="flex-1 px-4 py-3 text-slate-400 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 hover:text-slate-300 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        {id ? "Actualizar Usuario" : "Crear Usuario"}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}