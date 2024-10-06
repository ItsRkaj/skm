export function formatSwedishDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const parts = new Intl.DateTimeFormat('sv-SE', options).formatToParts(date);

  const month = parts.find((part) => part.type === 'month')?.value ?? '';
  const day = parts.find((part) => part.type === 'day')?.value ?? '';
  const year = parts.find((part) => part.type === 'year')?.value ?? '';

  return `${month.charAt(0).toUpperCase() + month.slice(1)} ${day}, ${year}`;
}

export function formatTime(date: Date): string {
  return date.toLocaleString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
