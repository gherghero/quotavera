/**
 * Formats a number as a EUR currency string.
 * e.g., 12345.67 -> "12.345,67 €"
 * @param n - The number to format.
 */
export function formatCurrencyEUR(n: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(n);
}

/**
 * Calculates the progress percentage, clamped between 0 and 100.
 * @param done - The current progress value.
 * @param total - The total value.
 * @returns A number between 0 and 100.
 */
export function progressPct(done: number, total: number): number {
  if (total === 0) {
    return 0;
  }
  const pct = (done / total) * 100;
  return Math.max(0, Math.min(100, pct));
}
