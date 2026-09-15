export function formatKES(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`;
}

export function formatShortKES(amount: number): string {
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    const rounded = millions >= 10 ? millions.toFixed(1) : millions.toFixed(2);
    return `KES ${rounded.replace(/\.0+$/, '')}M`;
  }
  return `KES ${Math.round(amount / 1000)}K`;
}

export function formatMileage(km: number): string {
  return `${km.toLocaleString('en-KE')} km`;
}

export function daysBetween(start: string, end: string): number {
  if (!start || !end) return 0;
  const from = new Date(start).getTime();
  const to = new Date(end).getTime();
  if (Number.isNaN(from) || Number.isNaN(to) || to <= from) return 0;
  return Math.round((to - from) / 86_400_000);
}

export function dateInputValue(date = new Date()): string {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

export function nextDateInputValue(value: string): string {
  if (!value) return dateInputValue();
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + 1);
  return dateInputValue(date);
}
