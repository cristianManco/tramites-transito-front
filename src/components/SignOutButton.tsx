import React from "react";
import { LogOutIcon, PowerIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { SignOutButtonProps } from "./types/sidebar";
import { Alert } from "./Alerts";

export const SignOutButton = ({ isOpen }: SignOutButtonProps) => {
    const { logout } = useAuth();
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
        <div className="bottom-0 w-full py-3 px-4">
            {isOpen ? (
                <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full py-2 text-[11px] flex justify-center items-center gap-2 text-white bg-gradient-to-r from-blue-700 via-blue-900 to-blue-700 rounded-full hover:opacity-70 transition duration-200 cursor-pointer"
                >
                    <LogOutIcon className="size-4" />Cerrar Sesión
                </button>
            ) : (
                <button
                    type="button"
                    onClick={handleSignOut}
                    className="size-8 mx-auto flex items-center justify-center text-white bg-gradient-to-r from-blue-700 to-blue-900 rounded-full hover:bg-red-800 focus:outline-none transition duration-200 cursor-pointer"
                    title="Cerrar sesión"
                >
                    <PowerIcon className="size-4" />
                </button>
            )}
        </div>
    );
};

