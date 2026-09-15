import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  BanknoteIcon,
  CheckIcon,
  CopyIcon,
  FileTextIcon,
  MessageCircleIcon,
  SendIcon,
  ShieldCheckIcon } from
'lucide-react';
import { useDeals } from '../contexts/DealsContext';
import { PaymentPill, StagePill } from '../components/crm/StatusPill';
import { paymentPath, paymentUrl, stageMeta, stageOrder, timeAgo } from '../utils/deal';
import { formatKES } from '../utils/format';
import type { DealStage } from '../types/deal';

const docStatusTone: Record<string, string> = {
  awaiting: 'text-ink-600',
  received: 'text-forest',
  signed: 'text-forest'
};

export function DealDetail() {
  const { id } = useParams();
  const { getDeal, setStage, logActivity, recordPayment } = useDeals();
  const deal = id ? getDeal(id) : undefined;
  const [copied, setCopied] = useState(false);
  const [nudged, setNudged] = useState(false);

  if (!deal) {
    return (
      <div className="mx-auto max-w-shell px-5 py-24 text-center lg:px-8">
        <h1 className="font-display text-4xl tracking-tight text-ink">Deal not found</h1>
        <Link
          to="/deals"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-bone">
          
          Back to the console
        </Link>
      </div>);

  }

  const outstanding = Math.max(deal.depositDue - deal.amountPaid, 0);
  const kyc = [
  { label: 'Full name', value: deal.customer.name },
  { label: 'Phone', value: deal.customer.phone },
  { label: 'Email', value: deal.customer.email },
  { label: 'ID / passport', value: deal.customer.idNumber },
  { label: 'KRA PIN', value: deal.customer.kraPin },
  { label: 'Address', value: deal.customer.address },
  { label: 'Licence number', value: deal.customer.licenceNumber },
  { label: 'Next of kin', value: deal.customer.nextOfKin }];


  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(paymentUrl(deal));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const nudge = () => {
    logActivity(deal.id, 'Payment link re-sent on WhatsApp with a reminder', deal.owner, 'whatsapp');
    setNudged(true);
    window.setTimeout(() => setNudged(false), 2500);
  };

  return (
    <div className="mx-auto max-w-shell px-5 py-8 lg:px-8 lg:py-12">
      <Link
        to="/deals"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 transition-colors duration-150 ease-swift hover:text-ink">
        
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
        Deal console
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-600">
            {deal.ref} · {deal.type === 'hire' ? 'Hire' : 'Sale'} · {deal.source} · owned by{' '}
            {deal.owner}
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight text-ink lg:text-6xl">
            {deal.customer.name || 'Unnamed enquiry'}
          </h1>
          <p className="mt-2 text-lg text-ink-600">{deal.vehicleLabel}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StagePill stage={deal.stage} />
          <PaymentPill status={deal.paymentStatus} />
        </div>
      </div>

      <ol className="mt-10 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
        {stageOrder.map((stage, index) => {
          const reached = stageOrder.indexOf(deal.stage) >= index;
          return (
            <li
              key={stage}
              className={`border-t-2 pt-3 ${reached ? 'border-forest' : 'border-bone-line'}`}>
              
              <p
                className={`text-sm font-semibold ${reached ? 'text-ink' : 'text-ink-600'}`}>
                
                {stageMeta[stage].label}
              </p>
              <p className="mt-1 text-xs text-ink-600">{stageMeta[stage].hint}</p>
            </li>);

        })}
      </ol>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <div className="space-y-12">
          <section>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-3xl tracking-tight text-ink">Customer record</h2>
              <span className="text-xs text-ink-600">Collected through the link</span>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-y-5 border-t border-bone-line pt-6 sm:grid-cols-3">
              {kyc.map((field) =>
              <div key={field.label}>
                  <dt className="text-xs uppercase tracking-[0.14em] text-ink-600">
                    {field.label}
                  </dt>
                  <dd
                  className={`mt-1 text-sm ${field.value ? 'font-medium text-ink' : 'italic text-ink-600'}`}>
                  
                    {field.value || 'Not yet provided'}
                  </dd>
                </div>
              )}
            </dl>
            {deal.hire &&
            <p className="mt-6 rounded-lg bg-bone-dim px-4 py-3 text-sm text-ink">
                Hire terms: {deal.hire.days} days from {deal.hire.from} to {deal.hire.to}, pickup at{' '}
                {deal.hire.pickup}, {deal.hire.withDriver ? 'with a driver' : 'self-drive'}.
              </p>
            }
          </section>

          <section>
            <h2 className="font-display text-3xl tracking-tight text-ink">Agreement &amp; signature</h2>
            <div className="mt-5 rounded-2xl border border-bone-line bg-white p-6">
              {deal.signedAt ?
              <div className="flex flex-wrap items-start justify-between gap-6">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-semibold text-forest">
                      <ShieldCheckIcon className="h-4 w-4" aria-hidden="true" />
                      Signed electronically {timeAgo(deal.signedAt)}
                    </p>
                    <p className="mt-4 font-display text-4xl italic tracking-tight text-ink">
                      {deal.signatureName}
                    </p>
                    <p className="mt-3 max-w-md text-xs text-ink-600">
                      Signature captured with device timestamp and IP, bound to {deal.ref} under the
                      Kenya Information and Communications Act. Audit trail stored with the
                      agreement.
                    </p>
                  </div>
                  <a
                  href={`/checkout/${deal.token}`}
                  className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-150 ease-swift hover:bg-bone-dim">
                  
                    <FileTextIcon className="h-4 w-4" aria-hidden="true" />
                    View agreement
                  </a>
                </div> :

              <div className="flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <p className="text-sm font-semibold text-ink">Awaiting the customer’s signature</p>
                    <p className="mt-2 max-w-md text-sm text-ink-600">
                      The {deal.type === 'hire' ? 'hire' : 'sale'} agreement is attached to the link.
                      They sign on their phone — no printing, no scanning.
                    </p>
                  </div>
                  <button
                  type="button"
                  onClick={nudge}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-forest">
                  
                    <SendIcon className="h-4 w-4" aria-hidden="true" />
                    {nudged ? 'Reminder sent' : 'Send a reminder'}
                  </button>
                </div>
              }
            </div>
          </section>

          <section>
            <h2 className="font-display text-3xl tracking-tight text-ink">Money</h2>
            <dl className="mt-5 divide-y divide-bone-line border-y border-bone-line">
              {[
              { label: 'Contract value', value: formatKES(deal.totalAmount) },
              { label: 'Requested on this link', value: formatKES(deal.depositDue) },
              { label: 'Received', value: formatKES(deal.amountPaid) },
              { label: 'Outstanding', value: formatKES(outstanding) }].
              map((row) =>
              <div key={row.label} className="flex items-baseline justify-between gap-4 py-4">
                  <dt className="text-sm text-ink-600">{row.label}</dt>
                  <dd className="text-base font-semibold text-ink">{row.value}</dd>
                </div>
              )}
            </dl>
            {outstanding > 0 &&
            <button
              type="button"
              onClick={() => recordPayment(deal.token, 'bank', outstanding)}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-150 ease-swift hover:bg-bone-dim">
              
                <BanknoteIcon className="h-4 w-4" aria-hidden="true" />
                Record {formatKES(outstanding)} received off-platform
              </button>
            }
          </section>

          <section>
            <h2 className="font-display text-3xl tracking-tight text-ink">Documents</h2>
            <ul className="mt-5 divide-y divide-bone-line border-y border-bone-line">
              {deal.documents.map((doc) =>
              <li key={doc.id} className="flex items-center justify-between gap-4 py-4">
                  <span className="flex items-center gap-3">
                    <FileTextIcon className="h-4 w-4 text-ink-600" aria-hidden="true" />
                    <span>
                      <span className="block text-sm font-medium text-ink">{doc.name}</span>
                      {doc.note && <span className="block text-xs text-ink-600">{doc.note}</span>}
                    </span>
                  </span>
                  <span
                  className={`text-xs font-semibold capitalize ${docStatusTone[doc.status]}`}>
                  
                    {doc.status === 'awaiting' ? 'Awaiting' : doc.status}
                  </span>
                </li>
              )}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl tracking-tight text-ink">Audit trail</h2>
            <ol className="mt-6 space-y-6 border-l border-bone-line pl-6">
              {[...deal.activity].reverse().map((item) =>
              <li key={item.id} className="relative">
                  <span
                  className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-forest"
                  aria-hidden="true" />
                
                  <p className="text-sm text-ink">{item.label}</p>
                  <p className="mt-1 text-xs text-ink-600">
                    {item.actor} · {item.channel ?? 'system'} · {timeAgo(item.at)}
                  </p>
                </li>
              )}
            </ol>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl bg-ink p-6 text-bone">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-bright">
              Customer payment link
            </h2>
            <code className="mt-4 block truncate rounded-lg bg-white/10 px-3 py-3 text-sm">
              {paymentUrl(deal)}
            </code>
            <div className="mt-4 grid gap-3">
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-bright px-4 py-3 text-sm font-semibold text-ink transition-colors duration-150 ease-swift hover:bg-amber">
                
                {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                {copied ? 'Link copied' : 'Copy link'}
              </button>
              <button
                type="button"
                onClick={nudge}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-4 py-3 text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-white/10">
                
                <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
                Re-send on WhatsApp
              </button>
              <a
                href={paymentPath(deal)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-4 py-3 text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-white/10">
                
                <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
                Open customer view
              </a>
            </div>
            <p className="mt-4 text-xs text-bone/50">
              Verify the reference and amount before sharing. Payment confirmation is matched manually against the recipient's M-Pesa statement.
            </p>
          </div>

          <div className="rounded-2xl border border-bone-line bg-white p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-600">
              Move this deal
            </h2>
            <label className="mt-4 block">
              <span className="sr-only">Deal stage</span>
              <select
                value={deal.stage}
                onChange={(event) => setStage(deal.id, event.target.value as DealStage)}
                className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none">
                
                {stageOrder.map((stage) =>
                <option key={stage} value={stage}>
                    {stageMeta[stage].label}
                  </option>
                )}
              </select>
            </label>
            <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-ink-600">
              Internal note
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              {deal.notes || 'No notes yet.'}
            </p>
          </div>
        </aside>
      </div>
    </div>);

}
