"use client"

import Swal from "sweetalert2"

interface AlertProps {
    icon: "success" | "error" | "warning" | "info" | "question"
    title: string
    text: string
    confirmButtonText?: string
    cancelButtonText?: string
    showCancelButton?: boolean
    onConfirm?: () => void
    onCancel?: ()=> void;
}

export const Alert = ({
    icon,
    title,
    text,
    confirmButtonText = "Aceptar",
    cancelButtonText = "Cancelar",
    showCancelButton = false,
    onConfirm,
    onCancel,
}: AlertProps) => {
    const showAlert = () => {
        Swal.fire({
            icon,
            title,
            text,
            showCancelButton,
            confirmButtonText,
            cancelButtonText,
            confirmButtonColor: "#125799",
            cancelButtonColor: "#ff0000",
        }).then((result) => {
            if (result.isConfirmed && onConfirm) {
                onConfirm()
            }
            if (result.isDenied && onCancel) {
                onCancel()
            }
        })
    }

    return { showAlert }
}
