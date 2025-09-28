"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/components/Loader";
import { Users, FileText, Clock, ClipboardList } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      router.push("/dashboard/inicio");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center text-center px-6 py-12">
        <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
          Bienvenido al Sistema de Trámites
        </h1>
        <p className="text-base md:text-lg text-gray-300 max-w-xl mb-8">
          Plataforma para la gestión de trámites, turnos y seguimiento entre
          asesores y ciudadanos. Optimiza la atención y facilita el acceso a
          servicios de tránsito de forma organizada.
        </p>

        {/* Botones de acción */}
        <div className="flex gap-3">
          <Link
            href="/auth/login"
            className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-medium shadow-md shadow-indigo-600/20 text-sm md:text-base"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/auth/register"
            className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition font-medium shadow-md shadow-slate-700/20 text-sm md:text-base"
          >
            Registrarse
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 bg-slate-900 border-t border-slate-800">
        <h2 className="text-2xl font-bold text-center mb-10">
          Funcionalidades principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center bg-slate-950 rounded-xl p-5 shadow-md hover:shadow-purple-500/10 transition">
            <Users className="h-10 w-10 text-purple-400 mb-3" />
            <h3 className="font-semibold text-base mb-1">Gestión de Usuarios</h3>
            <p className="text-gray-400 text-sm">
              Administra los usuarios con roles y permisos.
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-slate-950 rounded-xl p-5 shadow-md hover:shadow-pink-500/10 transition">
            <FileText className="h-10 w-10 text-pink-400 mb-3" />
            <h3 className="font-semibold text-base mb-1">Tipos de Trámite</h3>
            <p className="text-gray-400 text-sm">
              Define y organiza los diferentes tipos de trámites.
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-slate-950 rounded-xl p-5 shadow-md hover:shadow-indigo-500/10 transition">
            <Clock className="h-10 w-10 text-indigo-400 mb-3" />
            <h3 className="font-semibold text-base mb-1">Turnos</h3>
            <p className="text-gray-400 text-sm">
              Gestiona turnos para ciudadanos y asesores.
            </p>
          </div>
          <div className="flex flex-col items-center text-center bg-slate-950 rounded-xl p-5 shadow-md hover:shadow-teal-500/10 transition">
            <ClipboardList className="h-10 w-10 text-teal-400 mb-3" />
            <h3 className="font-semibold text-base mb-1">Trámites</h3>
            <p className="text-gray-400 text-sm">
              Consulta y administra trámites en curso.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 text-center text-gray-500 border-t border-slate-800 bg-slate-950 text-sm">
        © {new Date().getFullYear()} Sistema de Trámites. Todos los derechos
        reservados. <br />
        <i className="text-gray-400">
          Desarrollado por{" "}
          <span className="font-semibold text-purple-700">Cristian Manco</span>
        </i>
      </footer>
    </main>
  );
}
