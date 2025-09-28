"use client";

import { Alert } from "@/components/Alerts";
import { UserAvatar } from "@/components/UserAvatar";
import { useAuth } from "@/hooks/useAuth";
import {
    CircleArrowLeftIcon,
    MailPlusIcon,
    MailIcon,
    ShieldXIcon,
    LogOutIcon,
    UserRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const { logout, user: session } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/auth/login");
    };

    const handleSignOut = () => {
        const { showAlert } = Alert({
            icon: "question",
            title: "¿Estás seguro?",
            text: "¿Quieres cerrar sesión?",
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
            onConfirm: () => handleLogout(),
        });

        showAlert();
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-slate-950 overflow-hidden">
            {/* Fondos decorativos */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
                <div className="absolute top-20 left-10 h-72 w-72 bg-blue-700/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 h-72 w-72 bg-cyan-700/20 rounded-full blur-3xl animate-pulse delay-2000" />
            </div>

            {/* Contenido principal */}
            <div className="animate-fadeIn text-white flex flex-col items-center text-center gap-4 max-w-3xl">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
                    Página no encontrada
                    <br className="hidden sm:block" />
                    <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-transparent bg-clip-text font-black animate-pulse">
                        Error 404
                    </span>
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
                    <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl">
                        Oops! No pudimos encontrar la página que buscabas. Verifica la URL o
                        comunícate con soporte si el problema persiste.
                    </p>
                    <ShieldXIcon className="size-14 md:size-20 text-red-600 animate-bounce flex-shrink-0" />
                </div>

                {/* Acciones */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-700 to-cyan-700 text-white hover:opacity-80 transition"
                    >
                        <CircleArrowLeftIcon className="size-4" />
                        Ir al inicio
                    </Link>
                    <Link
                        href="mailto:camilomanco2005@gmail.com"
                        className="flex items-center gap-2 px-5 py-2 rounded-full border border-slate-600 text-slate-300 hover:bg-slate-800/50 transition"
                    >
                        <MailPlusIcon className="size-4" />
                        Contactar soporte
                    </Link>
                    {session && (
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-red-700 to-red-900 text-white hover:opacity-80 transition"
                        >
                            <LogOutIcon className="size-4" />
                            Cerrar sesión
                        </button>
                    )}
                </div>

                {/* Usuario */}
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 mt-6">
                    {session ? (
                        <div className="relative">
                            <UserAvatar user={session.name} size={40} />
                            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-slate-950" />
                        </div>
                    ) : (
                        <div
                            className="rounded-full bg-slate-700 flex items-center justify-center text-gray-300"
                            style={{ width: 40, height: 40 }}
                        >
                            <UserRoundIcon className="w-6 h-6" />
                        </div>
                    )}
                    <div className="text-center sm:text-left">
                        <p className="text-lg font-semibold">{session?.name ?? "Invitado"}</p>
                        {session?.email && (
                            <p className="flex items-center gap-1 text-sm text-slate-400">
                                <MailIcon className="w-4 h-4" /> {session.email}
                            </p>
                        )}
                    </div>
                    <span className="text-2xl">👋🏼</span>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-10 text-slate-500 text-xs">
                © {new Date().getFullYear()} | Desarrollado por{" "}
                <span className="text-blue-400 font-semibold">Cristian Manco</span>
            </footer>
        </div>
    );
}
