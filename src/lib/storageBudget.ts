// Conservative cap; localStorage is ~5MB total and shared with other keys.
export const DEFAULT_BUDGET_BYTES = 4_000_000;

export function withinBudget(
  serialized: string,
  budgetBytes: number = DEFAULT_BUDGET_BYTES
): boolean {
  // UTF-16 code units → ~2 bytes worst case; use Blob if available else *2.
  const bytes =
    typeof Blob !== "undefined"
      ? new Blob([serialized]).size
      : serialized.length * 2;
  return bytes <= budgetBytes;
}
