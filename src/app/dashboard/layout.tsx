"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import Loader from "@/components/Loader"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/Header"
import { sidebarMenu } from "@/components/MenuItems"


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { loading } = useAuth()

    const toggleSidebar = () => setSidebarOpen((prev) => !prev)

    // Cerrar sidebar en móvil cuando se hace click en un ítem
    const handleMenuItemClick = () => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false)
        }
    }

    // Detectar cambios de tamaño de pantalla y ajustar sidebar
    useEffect(() => {
        const handleResize = () => {
            setSidebarOpen(window.innerWidth >= 768)
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-200">
                <Loader />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar
                isOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
                menuItems={sidebarMenu}
                onMenuItemClick={handleMenuItemClick}
                enableSearch={true}
            />

            <div
                className={`flex-1 flex flex-col bg-slate-200 transition-all duration-300 ${sidebarOpen ? "md:ml-60" : "md:ml-16"
                    }`}
            >
                <Header toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-200 py-2 mt-16 mx-4">
                    {children}
                </main>
            </div>
        </div>
    )
}
