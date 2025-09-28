"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/components/Loader";

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
    return (
      <Loader />
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Bienvenido al Sistema de Tramites
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
          Plataforma para la gestión de trámites, turnos y seguimiento entre
          asesores y ciudadanos. Optimiza la atención y facilita el acceso a
          servicios de tramites de transito.
        </p>

        {/* Botones de acción */}
        <div className="flex gap-4">
          <Link
            href="/auth/login"
            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-medium"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/auth/register"
            className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition font-medium"
          >
            Registrarse
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 border-t border-gray-800">
        © {new Date().getFullYear()} Sistema de Turnos. Todos los derechos
        reservados.
      </footer>
    </main>
  );
}
