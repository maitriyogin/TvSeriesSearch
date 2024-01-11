export const isEmpty = (v?: string | null) =>
  v === undefined || v === null || v?.trim() === '';
