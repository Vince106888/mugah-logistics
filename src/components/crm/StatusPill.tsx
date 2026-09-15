import type { DealStage, PaymentStatus } from '../../types/deal';
import { paymentMeta, stageMeta } from '../../utils/deal';

const stageTone: Record<DealStage, string> = {
  enquiry: 'bg-bone-dim text-ink-600',
  'link-sent': 'bg-amber-soft text-amber',
  'details-in': 'bg-amber-soft text-amber',
  signed: 'bg-forest-pale text-forest',
  'deposit-paid': 'bg-forest text-bone',
  delivered: 'bg-ink text-bone'
};

const paymentTone: Record<'neutral' | 'warn' | 'good', string> = {
  neutral: 'bg-bone-dim text-ink-600',
  warn: 'bg-amber-soft text-amber',
  good: 'bg-forest-pale text-forest'
};

export function StagePill({ stage }: {stage: DealStage;}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${stageTone[stage]}`}>
      
      {stageMeta[stage].label}
    </span>);

}

export function PaymentPill({ status }: {status: PaymentStatus;}) {
  const meta = paymentMeta[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${paymentTone[meta.tone]}`}>
      
      <span
        className={`h-1.5 w-1.5 rounded-full ${
        meta.tone === 'good' ? 'bg-forest' : meta.tone === 'warn' ? 'bg-amber' : 'bg-ink-600'}`
        }
        aria-hidden="true" />
      
      {meta.label}
    </span>);

}
