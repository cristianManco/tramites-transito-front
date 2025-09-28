export const normalizeText = (text: string): string => {
  return text
    .normalize("NFD") // separa caracteres base de tildes
    .replace(/[\u0300-\u036f]/g, "") // elimina los caracteres diacríticos
    .toLowerCase()
}
