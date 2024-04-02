export function generateSlug(text: string): string {
  return text
        .normalize("NFD") // Normaliza caracteres unicode (remove acentos)
        .replace(/[\u0300-\u036f]/g, "") // Remove caracteres diacríticos
        .toLowerCase() // Converte para minúsculas
        .replace(/[^a-z0-9]/g, "-") // Remove caracteres que não são letras nem números e substitui por hífen
        .replace(/-+/g, "-") // Remove múltiplos hífens seguidos
        .replace(/^-|-$/g, ""); // Remove hífens no início e no fim
}
