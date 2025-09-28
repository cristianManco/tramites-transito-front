import { SearchBarProps } from "@/components/types/inputs";
import { Search, X, XIcon } from "lucide-react"

export const SearchBar = <T,>({
    isOpen,
    searchTerm,
    onSearchChange,
    onClearSearch,
    placeholder = "Buscar...",
    className = "",
    filteredResults = [],
    onToggleOpen,
}: SearchBarProps<T>) => {
    const hasSearch = searchTerm.trim().length > 0;
    const noResults = hasSearch && filteredResults.length === 0;

    if (!isOpen) {
        return (
            <div className="px-4 pt-7 flex justify-center">
                <button
                    type="button"
                    onClick={() => onToggleOpen?.(true)}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <Search className="h-4 w-4" color="white" />
                </button>
            </div>
        );
    }

    return (
        <div className={`px-4 py-2 ${className} `}>
            <div className="relative ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4" color="white" />
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-10 py-2 border border-gray-700 rounded-full bg-slate-900 text-white text-[11px] placeholder-gray-400 focus:outline-none  focus:border-gray-400 transition duration-300 shadow-sm"
                />
                {hasSearch && (
                    <button
                        onClick={onClearSearch}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#125799] transition duration-150"
                        type="button"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {noResults && (
                <p className="text-[11px] text-center mt-2 text-gray-500 flex items-center justify-center gap-1">
                    <XIcon className="size-4 text-red-600" />
                    Sin resultados.
                </p>
            )}
        </div>
    )
}
