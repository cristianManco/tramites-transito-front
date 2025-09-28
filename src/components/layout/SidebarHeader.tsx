import Image from "next/image"
import { SidebarHeaderProps } from "../types/sidebar"

export const SidebarHeader = ({ isOpen, }: SidebarHeaderProps) => {
    return (
        <div className={`flex items-center justify-center gap-2 px-4 pt-5`}>
            {isOpen ? (
                <Image
                    src="/tramites-de-transito-removebg-preview.png"
                    alt="Logo"
                    width={130}
                    height={140}
                    quality={100}
                    priority
                />
            ) : (
                <span className="text-xl font-bold hidden md:block">CRISTDEV</span>
            )}
        </div>
    )
}