import { ComponentSize } from "./common"

export interface InputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    type?: 'text' | 'email' | 'password' | 'number'
    size?: ComponentSize
    variant?: 'default' | 'error' | 'success'
    disabled?: boolean
    className?: string
}

export interface SearchBarProps<T = unknown> {
    searchTerm: string
    onSearchChange: (value: string) => void
    onClearSearch: () => void
    placeholder?: string
    className?: string
    size?: ComponentSize
    variant?: 'default' | 'sidebar' | 'table'
    onToggleOpen?: (value: boolean) => void
    isOpen?: boolean
    disabled?: boolean
    filteredResults: T[]
}