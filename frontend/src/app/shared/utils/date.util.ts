export function formatDate(
  value: string | Date | null | undefined,
  locale = 'en-US',
): string {
  if (value == null) {
    return 'Unknown date';
  }

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Unknown date';
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}
