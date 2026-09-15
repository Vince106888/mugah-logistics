import type { Deal, DealStage, PaymentStatus } from '../types/deal';
import { siteConfig } from '../config';

export const stageOrder: DealStage[] = [
'enquiry',
'link-sent',
'details-in',
'signed',
'deposit-paid',
'delivered'];


export const stageMeta: Record<DealStage, {label: string;hint: string;}> = {
  enquiry: { label: 'New enquiry', hint: 'Nobody has sent a link yet' },
  'link-sent': { label: 'Link sent', hint: 'Waiting on the customer' },
  'details-in': { label: 'Details in', hint: 'KYC captured, needs signature' },
  signed: { label: 'Signed', hint: 'Agreement executed, awaiting deposit' },
  'deposit-paid': { label: 'Deposit paid', hint: 'Cleared — prepare handover' },
  delivered: { label: 'Delivered', hint: 'Closed and handed over' }
};

export const paymentMeta: Record<PaymentStatus, {label: string;tone: 'neutral' | 'warn' | 'good';}> =
{
  unpaid: { label: 'Unpaid', tone: 'neutral' },
  pending: { label: 'Payment pending', tone: 'warn' },
  partial: { label: 'Part paid', tone: 'warn' },
  paid: { label: 'Paid', tone: 'good' }
};

export function stageProgress(stage: DealStage): number {
  return Math.round((stageOrder.indexOf(stage) + 1) / stageOrder.length * 100);
}

type PaymentLinkDeal = Pick<Deal, 'ref' | 'depositDue' | 'vehicleLabel'>;

export function paymentPath(deal: PaymentLinkDeal): string {
  const params = new URLSearchParams({
    amount: String(deal.depositDue),
    ref: deal.ref,
    for: deal.vehicleLabel
  });
  return `/pay?${params.toString()}`;
}

export function paymentUrl(deal: PaymentLinkDeal): string {
  return `${siteConfig.url}${paymentPath(deal)}`;
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  return `${months} ${months === 1 ? 'month' : 'months'} ago`;
}

export function initials(name: string): string {
  return name.
  split(' ').
  filter(Boolean).
  slice(0, 2).
  map((part) => part[0]?.toUpperCase() ?? '').
  join('');
}
