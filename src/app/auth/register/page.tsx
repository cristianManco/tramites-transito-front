"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, Mail, User, Lock, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await register(form);
      router.push("/dashboard/inicio");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Error al registrarse" + err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="relative bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-6 shadow-lg">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mb-3">
              <User className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Crear cuenta</h1>
            <p className="text-slate-400 text-sm">Únete a nuestra plataforma</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300 uppercase tracking-wide">
                Nombre
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800/60 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300 uppercase tracking-wide">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800/60 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300 uppercase tracking-wide">
                Contraseña
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 6 caracteres"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2 bg-slate-800/60 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:cursor-pointer hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-medium py-2 rounded-lg text-sm transition-all shadow-md hover:shadow-blue-500/20 disabled:shadow-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="text-xs">Creando cuenta...</span>
                </div>
              ) : (
                "Registrarse"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-5 text-center">
            <p className="text-slate-400 text-xs">
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={() => router.push("/auth/login")}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
              >
                Iniciar sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
