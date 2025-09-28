"use client"

import { useSidebar } from "@/hooks/useSidebar";
import { SignOutButton } from "../SignOutButton";
import { SidebarProps } from "../types/sidebar";
import { SearchBar } from "../ui/inputs/SearchBar";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNavigation } from "./SidebarNavigation";

export function Sidebar({
    isOpen,
    toggleSidebar,
    menuItems,
    onMenuItemClick,
    enableSearch = false,
    searchPlaceholder = "Buscar en menú..."
}: SidebarProps) {
    const {
        searchTerm,
        filteredMenu,
        toggleSubmenu,
        handleLinkClick,
        handleSearchChange,
        clearSearch,
        isItemActive,
        isSubItemActive,
        isMenuExpanded,
        isLinkActive,
    } = useSidebar({ isOpen, toggleSidebar, menuItems, onMenuItemClick, enableSearch });

    return (
        <>
            {/* Overlay para mobile */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden ${isOpen ? "block" : "hidden"}`}
                onClick={toggleSidebar}
            />

            <aside
                className={`
                    fixed top-0 left-0 z-50 h-screen bg-slate-950 text-white transition-all duration-300 ease-in-out
                    overflow-hidden flex flex-col
                    ${isOpen ? "w-60" : "w-16 -translate-x-full md:translate-x-0"}
                `}
            >
                {/* Header */}
                <SidebarHeader
                    isOpen={isOpen}
                    onLinkClick={handleLinkClick}
                />

                {/* Divider */}
                {isOpen && (
                    <div className="px-4 py-4">
                        <hr className="border-gray-700" />
                    </div>
                )}

                {/* Search */}
                {enableSearch && (
                    <SearchBar
                        isOpen={isOpen}
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        onClearSearch={clearSearch}
                        onToggleOpen={(val) => {
                            if (val && !isOpen) { toggleSidebar(); }
                        }}
                        placeholder={searchPlaceholder}
                        filteredResults={filteredMenu}
                    />
                )}

                {/* Navegación */}
                <SidebarNavigation
                    isOpen={isOpen}
                    filteredMenu={filteredMenu}
                    toggleSubmenu={toggleSubmenu}
                    handleLinkClick={handleLinkClick}
                    isItemActive={isItemActive}
                    isSubItemActive={isSubItemActive}
                    isMenuExpanded={isMenuExpanded}
                    isLinkActive={isLinkActive}
                />

                {/* Botón cerrar sesión */}
                <SignOutButton
                    isOpen={isOpen} session={null}                />
            </aside>
        </>
    );
}
