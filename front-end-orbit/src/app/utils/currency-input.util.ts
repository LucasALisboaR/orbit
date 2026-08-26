/** Formata número para exibição em input de moeda (pt-BR). */
export function formatCurrencyInput(value: number): string {
  if (!value) return '';
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Converte texto digitado (com ou sem máscara) para número decimal. */
export function parseCurrencyInput(raw: string): number {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return 0;
  return Number(digits) / 100;
}
