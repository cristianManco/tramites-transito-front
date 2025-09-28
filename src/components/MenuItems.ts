import { Users, FileText, Clock, ClipboardList } from "lucide-react"
import { SidebarItem } from "./types/sidebar"

export const sidebarMenu: SidebarItem[] = [
  {
    title: "Inicio",
    icon: Users,
    href: "/dashboard/inicio",
    cod_modulo: "inicio",
  },
  {
    title: "Usuarios",
    icon: Users,
    href: "/dashboard/users",
    cod_modulo: "usuarios",
  },
  {
    title: "Tipos de Trámite",
    icon: FileText,
    href: "/dashboard/tipos-tramites",
    cod_modulo: "tipos_tramite",
  },
  {
    title: "Turnos",
    icon: Clock,
    href: "/dashboard/turnos",
    cod_modulo: "turnos",
    // submenu: [
    //   {
    //     title: "Con Asesores",
    //     href: "/dashboard/turnos/asesores",
    //     cod_modulo: "turnos_asesores",
    //   },
    //   {
    //     title: "Con Ciudadanos",
    //     href: "/dashboard/turnos/ciudadanos",
    //     cod_modulo: "turnos_ciudadanos",
    //   },
    // ],
  },
  {
    title: "Trámites",
    icon: ClipboardList,
    href: "/dashboard/tramites",
    cod_modulo: "tramites",
  },
]
