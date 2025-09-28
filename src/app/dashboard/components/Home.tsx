'use client';

import { UserCheck2Icon } from "lucide-react";


export default function AdminHome() {


    return (
        <div className="w-full mx-0 p-1">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 via-blue-900 to-blue-700 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-t-xl">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                        <UserCheck2Icon className="size-3 sm:size-4 text-white" />
                        <h1 className="text-base sm:text-lg font-bold text-white">Dashboard de Gestión Humana</h1>
                    </div>
                    <div className="text-gray-300 text-[11px] sm:text-xs">
                        <p>{new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                </div>
            </div>

            {/* Indicadores - Grid con responsividad */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full py-3 sm:py-4">

            </div>

            {/* Secciones de datos - Cambio de flex-row a flex-col en pantallas pequeñas */}
            <div className="flex flex-col lg:flex-row justify-between gap-4 sm:gap-[1%] w-full pb-4">
                {/* Requisiciones Recientes */}
                <article className="flex flex-col gap-2 w-full lg:w-[50%] border border-gray-300 bg-gray-50 p-3 sm:p-5 rounded-xl">
                    <section className="flex items-center justify-between gap-2">
                    </section>
                    <section className="flex flex-col items-center gap-3 sm:gap-5 mt-2 sm:mt-4 h-full">

                    </section>
                </article>

                {/* Seleccionados Recientes */}
                <article className="flex flex-col gap-2 w-full lg:w-[50%] border border-gray-300 bg-gray-50 p-3 sm:p-5 rounded-xl mt-4 lg:mt-0">
                    <section className="flex items-center justify-between gap-2">
                        
                    </section>
                    <section className="flex flex-col items-center mt-2 sm:mt-4 gap-3 sm:gap-5 h-full">                 
                    </section>
                </article>
            </div>
        </div>
    );
}