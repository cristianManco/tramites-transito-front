import { Home, Users, FileText, Clock, ClipboardList } from "lucide-react";
import { SidebarItem } from "./types/sidebar";

export const sidebarMenu: SidebarItem[] = [
  {
    title: "Inicio",
    icon: Home,
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
  },
  {
    title: "Trámites",
    icon: ClipboardList,
    href: "/dashboard/tramites",
    cod_modulo: "tramites",
  },
];
