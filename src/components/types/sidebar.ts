import { AuthResponse } from "@/types/auth"


// ====== TIPOS BASE ======
export type SidebarItem = {
    title: string
    icon: React.ComponentType<{ className?: string }>
    href: string
    cod_modulo: string
    submenu?: SubMenuItem[]
}

export type SubMenuItem = {
    title: string
    href: string
    cod_modulo: string
}

// ====== INTERFACES DE PROPS ======
export interface SidebarProps {
    isOpen: boolean
    toggleSidebar: () => void
    menuItems: SidebarItem[]
    enableSearch?: boolean
    onMenuItemClick?: () => void 
    searchPlaceholder?: string
}

export interface UseSidebarProps {
    isOpen: boolean
    toggleSidebar: () => void
    enableSearch?: boolean
    menuItems: SidebarItem[]
    onMenuItemClick?: () => void
}

export interface SidebarHeaderProps {
    isOpen: boolean
    onLinkClick: () => void
}

export interface SidebarNavigationProps {
    isOpen: boolean
    filteredMenu: SidebarItem[]
    toggleSubmenu: (title: string) => void
    handleLinkClick: () => void
    isItemActive: (item: SidebarItem) => boolean
    isSubItemActive: (subItem: { href: string }) => boolean
    isMenuExpanded: (title: string) => boolean
    isLinkActive: (href: string) => boolean
}

export interface SignOutButtonProps {
    isOpen: boolean
    session: AuthResponse | null
}

// ====== TIPOS DE RETURN DE HOOKS ======
export interface UseSidebarReturn {
    pathname: string
    session: AuthResponse
    filteredMenu: SidebarItem[]
    toggleSubmenu: (title: string) => void
    handleLinkClick: () => void
    isItemActive: (item: SidebarItem) => boolean
    isSubItemActive: (subItem: { href: string }) => boolean
    isMenuExpanded: (title: string) => boolean
    isLinkActive: (href: string) => boolean
}