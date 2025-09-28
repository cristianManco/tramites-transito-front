"use client"

import { Alert } from "@/components/Alerts"
import { UserAvatar } from "@/components/UserAvatar"
import { useAuth } from "@/hooks/useAuth"
import { CircleArrowLeftIcon, MailPlusIcon, MailIcon, ShieldXIcon, LogOutIcon, UserRoundIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

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
        <>
            <div className="min-h-screen flex items-center justify-center w-full px-4">
                <div className="absolute inset-0 -z-10 h-full w-full bg-slate-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                    <div className="absolute left-0 right-0 -z-10 m-auto h-[300px] md:h-[500px] w-[300px] md:w-[500px] rounded-full bg-[#125799] opacity-20 blur-[100px]"></div>
                </div>
                <div className="animate-fadeIn max-w-5xl text-white flex flex-col items-center justify-center text-center gap-2 md:gap-4 px-4 py-6 md:py-8">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        ¡Not Found |{" "}
                        <br className="hidden max-sm:flex" />
                        <span className="bg-gradient-to-r from-blue-700 via-blue-900 to-blue-700 text-transparent bg-clip-text font-black animate-pulse">Error 404!</span>
                    </h1>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5 w-full md:w-[90%] lg:w-[75%]">
                        <p className="text-base sm:text-lg md:text-xl">
                            Oops! No se encontró la página hacia donde se dirige, verifica la información, sino comunícate con soporte.
                        </p>
                        <ShieldXIcon className="size-12 animate-pulse md:size-16 lg:size-20 text-red-600 flex-shrink-0" />
                    </div>
                    <article className="flex flex-col sm:flex-row items-center justify-center gap-3 my-3 md:my-4 w-full">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-700 via-blue-900 to-blue-700 text-white hover:opacity-70 transition duration-200 w-full sm:w-auto">
                            <CircleArrowLeftIcon className="size-4 md:size-5" />
                            Dirígete al inicio
                        </Link>
                        <Link
                            href="mailto:greta@bpogs.com"
                            className="flex items-center justify-center gap-2 px-4 md:px-5 py-2 rounded-full border border-white text-white hover:opacity-70 transition duration-200 hover:backdrop-blur-sm hover:bg-blue-900/10"
                        >
                            <MailPlusIcon className="size-4" />
                            Contactar a Soporte
                        </Link>
                        <section>
                            {session && (
                                <div className="w-full">
                                    <button
                                        type="button"
                                        onClick={handleSignOut}
                                        className="flex items-center justify-center gap-2 px-4 md:px-5 py-2 rounded-full bg-gradient-to-r from-red-700 via-red-900 to-red-700 text-white hover:opacity-60 transition duration-200"
                                    >
                                        <LogOutIcon className="size-4" />Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </section>
                    </article>
                    <article className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-center sm:justify-start">
                        <section>
                            {session ? (
                                <UserAvatar user={session.name} size={24} />
                            ) : (
                                <div
                                    className={`rounded-full bg-gray-600 flex items-center justify-center text-gray-300`}
                                    style={{ width: 24, height: 24 }}
                                >
                                    <UserRoundIcon style={{ width: 24, height: 24 }} />
                                </div>

                            )}
                        </section>
                        <section className="text-center">
                            <p className="text-base md:text-lg">{session?.name}</p>
                            <p className="flex items-center justify-center gap-1 text-xs md:text-sm text-gray-400"><MailIcon className="size-3 md:size-4" />{session?.email}</p>
                        </section>
                        <section>
                            <p className="text-2xl md:text-3xl">👋🏼</p>
                        </section>
                    </article>
                </div>
            </div>
        </>
    );
}