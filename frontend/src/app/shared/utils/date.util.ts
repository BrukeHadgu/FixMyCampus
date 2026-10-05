export function formatDate(value: string | Date): string {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(
    new Date(value)
  );
}