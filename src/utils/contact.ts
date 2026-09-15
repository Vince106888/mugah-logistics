import { company } from '../data/site';

export function whatsappUrl(message?: string): string {
  const number = company.whatsapp.replace(/[^\d]/g, '');
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

export function emailUrl(subject: string, body: string): string {
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
