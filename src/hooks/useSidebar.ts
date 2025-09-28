import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { SidebarItem, UseSidebarProps } from "@/components/types/sidebar"
import { normalizeText } from "@/libs/utils/normalize"
import { useAuth } from "./useAuth"

export const useSidebar = ({
    isOpen,
    toggleSidebar,
    menuItems,
    onMenuItemClick,
    enableSearch = false,
}: UseSidebarProps) => {
    const pathname = usePathname()
    const {user: session} = useAuth()
    const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({})
    const [searchTerm, setSearchTerm] = useState<string>("")
    const prevIsOpenRef = useRef(isOpen)

    // Limpiar búsqueda cuando se cierra el sidebar
    useEffect(() => {
        if (prevIsOpenRef.current && !isOpen && searchTerm.trim() !== "") {
            clearSearch()
        }
        prevIsOpenRef.current = isOpen
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, searchTerm])

    // Manejo de búsqueda
    const handleSearchChange = useCallback(
        (value: string) => {
            setSearchTerm(value)

            if (!value.trim()) {
                setOpenMenus({})
                return
            }

            const expandedMenus: { [key: string]: boolean } = {}
            menuItems.forEach((item) => {
                if (item.submenu && item.submenu.length > 0) {
                    expandedMenus[item.title] = true
                }
            })
            setOpenMenus(expandedMenus)
        },
        [menuItems]
    )

    const clearSearch = useCallback(() => {
        setSearchTerm("")
        setOpenMenus({})
    }, [])

    // Filtrado de menú por búsqueda
    const filteredMenu = useMemo(() => {
        if (enableSearch && searchTerm.trim()) {
            const normalizedSearch = normalizeText(searchTerm)

            return menuItems
                .map((item) => {
                    const itemMatches = normalizeText(item.title).includes(normalizedSearch)

                    let filteredSubmenu: SidebarItem["submenu"] = []

                    if (item.submenu) {
                        if (itemMatches) {
                            filteredSubmenu = item.submenu
                        } else {
                            filteredSubmenu = item.submenu.filter((subItem) =>
                                normalizeText(subItem.title).includes(normalizedSearch)
                            )
                        }
                    }

                    const shouldInclude =
                        itemMatches || (filteredSubmenu && filteredSubmenu.length > 0)

                    if (shouldInclude) {
                        return {
                            ...item,
                            submenu: item.submenu ? filteredSubmenu : undefined,
                        }
                    }

                    return null
                })
                .filter(Boolean) as SidebarItem[]
        }

        return menuItems
    }, [menuItems, enableSearch, searchTerm])

    // Toggle submenu (memoizado)
    const toggleSubmenu = useCallback(
        (title: string) => {
            if (!isOpen && window.innerWidth >= 768) {
                toggleSidebar()
                setTimeout(() => {
                    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }))
                }, 100)
                return
            }
            setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }))
        },
        [isOpen, toggleSidebar]
    )

    // Handler para clicks en links
    const handleLinkClick = useCallback(
        (e?: React.MouseEvent) => {
            e?.stopPropagation()
            if (window.innerWidth < 768) {
                onMenuItemClick?.()
            }
        },
        [onMenuItemClick]
    )

    // Helpers de estado activo
    const isItemActive = useCallback(
        (item: SidebarItem) => !!item.href && pathname.startsWith(item.href),
        [pathname]
    )
    const isSubItemActive = useCallback(
        (subItem: { href: string }) => pathname === subItem.href,
        [pathname]
    )
    const isMenuExpanded = useCallback(
        (title: string): boolean => {
            const menuItem = filteredMenu.find((it) => it.title === title)
            const hasSubmenu = menuItem?.submenu && menuItem.submenu.length > 0
            return Boolean(hasSubmenu && (openMenus[title] || searchTerm.trim() !== ""))
        },
        [filteredMenu, openMenus, searchTerm]
    )
    const isLinkActive = useCallback(
        (href: string) => pathname === href,
        [pathname]
    )

    return {
        pathname,
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
        session
    }
}
