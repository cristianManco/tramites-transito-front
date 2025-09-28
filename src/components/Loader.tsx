const Loader = () => (
    <div className="flex flex-col justify-center items-center gap-3 h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#125799]"></div>
        <p className="text-[11px] text-[#125799] font-bold">Cargando...</p>
    </div>
);

export default Loader;
