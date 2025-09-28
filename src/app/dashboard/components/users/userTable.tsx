"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteUsuario, getUsuarios, Usuario } from "@/libs/services/user";
import {
  Users,
  Plus,
  Edit3,
  Trash2,
  Search,
  Filter,
  UserCheck,
  UserX,
  Mail,
  Crown,
  HandHeart,
  User
} from "lucide-react";
import Loader from "@/components/Loader";
import { Alert } from "@/components/Alerts";

export default function UserTable() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    try {
      setLoading(true);
      const data = await getUsuarios();
      setUsuarios(data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const { showAlert } = Alert({
      icon: "warning",
      title: "¿Estás seguro?",
      text: "¿Deseas eliminar este usuario?",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      onConfirm: async () => {
        await deleteUsuario(id);
        loadUsuarios();
      },
    });

    showAlert();
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="w-4 h-4 text-amber-500" />;
      case "asesor":
        return <HandHeart className="w-4 h-4 text-blue-500" />;
      case "ciudadano":
        return <User className="w-4 h-4 text-green-500" />;
      default:
        return <User className="w-4 h-4 text-slate-500" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const baseClasses = "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium";
    switch (role) {
      case "admin":
        return `${baseClasses} bg-amber-100 text-amber-800 border border-amber-200`;
      case "asesor":
        return `${baseClasses} bg-blue-100 text-blue-800 border border-blue-200`;
      case "ciudadano":
        return `${baseClasses} bg-green-100 text-green-800 border border-green-200`;
      default:
        return `${baseClasses} bg-slate-100 text-slate-800 border border-slate-200`;
    }
  };

  const filteredUsuarios = usuarios.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="min-h-screen bg-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-700 rounded-lg">
                <Users className="w-6 h-6 text-slate-300" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-white">Gestión de Usuarios</h1>
                <p className="text-slate-400 text-sm">
                  {usuarios.length} usuario{usuarios.length !== 1 ? 's' : ''} registrado{usuarios.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/users/create"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg hover:shadow-blue-500/25"
            >
              <Plus className="w-4 h-4" />
              Nuevo Usuario
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar por nombre o correo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Role Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="pl-10 pr-8 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
              >
                <option value="all">Todos los roles</option>
                <option value="admin">Administrador</option>
                <option value="asesor">Asesor</option>
                <option value="ciudadano">Ciudadano</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden shadow-xl">
          {filteredUsuarios.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">
                {searchTerm || roleFilter !== "all" ? "No se encontraron usuarios" : "No hay usuarios registrados"}
              </h3>
              <p className="text-slate-500 text-sm">
                {searchTerm || roleFilter !== "all"
                  ? "Intenta ajustar los filtros de búsqueda"
                  : "Comienza agregando el primer usuario al sistema"
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800 border-b border-slate-700">
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Usuario</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Rol</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Estado</th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-slate-300">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsuarios.map((usuario, index) => (
                    <tr
                      key={usuario.id}
                      className={`border-b border-slate-800 hover:bg-slate-800/50 transition-colors ${index % 2 === 0 ? 'bg-slate-900' : 'bg-slate-900/50'
                        }`}
                    >
                      {/* Usuario Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-slate-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{usuario.name}</p>
                            <div className="flex items-center gap-1 text-slate-500 text-sm">
                              <Mail className="w-3 h-3" />
                              {usuario.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <span className={getRoleBadge(usuario.role)}>
                          {getRoleIcon(usuario.role)}
                          {usuario.role === "admin" ? "Administrador" :
                            usuario.role === "asesor" ? "Asesor" : "Ciudadano"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {usuario.activo ? (
                            <>
                              <UserCheck className="w-4 h-4 text-green-500" />
                              <span className="text-green-400 text-sm font-medium">Activo</span>
                            </>
                          ) : (
                            <>
                              <UserX className="w-4 h-4 text-red-500" />
                              <span className="text-red-400 text-sm font-medium">Inactivo</span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/dashboard/users/edit/${usuario.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors text-sm"
                          >
                            <Edit3 className="w-3 h-3" />
                            Editar
                          </Link>
                          <button
                            onClick={() => handleDelete(usuario.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
                          >
                            <Trash2 className="w-3 h-3" />
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {filteredUsuarios.length > 0 && (
          <div className="mt-6 flex justify-between items-center text-sm text-slate-400">
            <p>
              Mostrando {filteredUsuarios.length} de {usuarios.length} usuarios
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {usuarios.filter(u => u.activo).length} activos
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                {usuarios.filter(u => !u.activo).length} inactivos
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}