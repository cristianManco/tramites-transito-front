"use client"
import { useAuth } from "@/hooks/useAuth"
import { SidebarOpenIcon} from "lucide-react"
import Link from "next/link"
import { UserAvatar } from "./UserAvatar"

type HeaderProps = {
    toggleSidebar: () => void
    isSidebarOpen: boolean
}

export function Header({ toggleSidebar, isSidebarOpen }: HeaderProps) {
    const { user: session } = useAuth()
    const version ="0.3.0"

    return (
        <header
            className={`fixed top-0 right-0 z-50 flex h-16 items-center justify-between border-b border-slate-950 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-4 transition-all duration-300 ${isSidebarOpen ? "left-60" : "left-0"} sm:px-6 lg:px-[20px]`}
        >
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    type="button"
                    className="p-0 text-gray-400 border-0 hover:text-white"
                    aria-label="Toggle sidebar"
                >
                    <SidebarOpenIcon className="size-4 transition duration-200" />
                </button>
                <p className="text-gray-400 text-[11px]">v{version}</p>
            </div>
            <div className="flex items-center gap-4">               
                <div className="flex items-center gap-2">
                    {session ? (
                        <>
                            <div className="rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                                <UserAvatar user={session.name} size={24} />
                            </div>
                            <div className="hidden sm:block text-[11px] font-medium text-white">
                                {session?.name}
                            </div>
                        </>
                    ) : (
                        <div className="text-[11px] font-medium text-white">
                            <Link href="/auth/signin">
                                Iniciar sesión
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
