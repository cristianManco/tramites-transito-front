'use client';

import { useEffect, useState } from "react";
import {
    UserCheck2Icon,
    FileTextIcon,
    ListChecksIcon,
    ClockIcon,
} from "lucide-react";
import { getTiposTramite, TipoTramite } from "@/libs/services/type-tramites";
import { Turno, getTurnos } from "@/libs/services/turnos";
import { useTramites } from "@/hooks/useTramites";

export default function AdminHome() {
    const [tipos, setTipos] = useState<TipoTramite[]>([]);
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const [loading, setLoading] = useState(true);

    const { tramites, usuarios } = useTramites();

    useEffect(() => {
        loadTipos();
        loadTurnos();
    }, []);

    const loadTipos = async () => {
        const data = await getTiposTramite();
        setTipos(data);
    };

    const loadTurnos = async () => {
        setLoading(true);
        const data = await getTurnos();
        setTurnos(data);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-800 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-700 rounded-lg">
                            <UserCheck2Icon className="w-6 h-6 text-slate-300" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-white">
                                Dashboard de Gestión de Trámites
                            </h1>
                            <p className="text-slate-400 text-sm">
                                {tramites.length} trámite
                                {tramites.length !== 1 ? "s" : ""} en el sistema
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <CardIndicator
                        icon={
                            <UserCheck2Icon className="w-5 h-5 text-blue-600" />
                        }
                        title="Usuarios"
                        value={usuarios.length}
                        bg="bg-blue-100"
                    />
                    <CardIndicator
                        icon={<FileTextIcon className="w-5 h-5 text-green-600" />}
                        title="Trámites"
                        value={tramites.length}
                        bg="bg-green-100"
                    />
                    <CardIndicator
                        icon={<ListChecksIcon className="w-5 h-5 text-purple-600" />}
                        title="Tipos"
                        value={tipos.length}
                        bg="bg-purple-100"
                    />
                    <CardIndicator
                        icon={<ClockIcon className="w-5 h-5 text-orange-600" />}
                        title="Turnos"
                        value={turnos.length}
                        bg="bg-orange-100"
                    />
                </div>

                {/* Data Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Trámites por tipo */}
                    <article className="bg-slate-900 border border-slate-700 rounded-lg p-4">
                        <h2 className="text-sm font-semibold text-white mb-3">
                            Trámites por tipo
                        </h2>
                        <ul className="space-y-2">
                            {tipos.map((t) => (
                                <li
                                    key={t.id}
                                    className="flex justify-between text-sm text-slate-300 border-b border-slate-700 pb-1"
                                >
                                    <span>{t.nombre}</span>
                                    <span className="font-bold text-white">
                                        {tramites.filter((tr) => tr.tipo_id === t.id).length}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </article>

                    {/* Últimos turnos */}
                    <article className="bg-slate-900 border border-slate-700 rounded-lg p-4">
                        <h2 className="text-sm font-semibold text-white mb-3">
                            Últimos turnos
                        </h2>
                        {loading ? (
                            <p className="text-slate-400 text-sm">Cargando...</p>
                        ) : (
                            <ul className="space-y-2">
                                {turnos.slice(0, 5).map((turno) => (
                                    <li
                                        key={turno.id}
                                        className="flex justify-between text-sm text-slate-300 border-b border-slate-700 pb-1"
                                    >
                                        <span>{turno.ciudadano_id}</span>
                                        <span className="text-slate-400">
                                            {new Date(turno.fecha).toLocaleDateString()}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </article>
                </div>
            </div>
        </div>
    );
}

function CardIndicator({
    icon,
    title,
    value,
    bg,
}: {
    icon: React.ReactNode;
    title: string;
    value: number;
    bg: string;
}) {
    return (
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${bg}`}>{icon}</div>
                <div>
                    <p className="text-sm text-slate-400">{title}</p>
                    <p className="text-xl font-semibold text-white">{value}</p>
                </div>
            </div>
        </div>
    );
}
