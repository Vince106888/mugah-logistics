import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  FileSignatureIcon,
  PlusIcon } from
'lucide-react';
import { PipelineBoard } from '../components/crm/PipelineBoard';
import { NewLinkPanel } from '../components/crm/NewLinkPanel';
import { PaymentPill } from '../components/crm/StatusPill';
import { useDeals } from '../contexts/DealsContext';
import { paymentUrl, timeAgo } from '../utils/deal';
import { formatKES, formatShortKES } from '../utils/format';
import type { Deal } from '../types/deal';

type Filter = 'all' | 'sale' | 'hire' | 'attention';

const filters: {value: Filter;label: string;}[] = [
{ value: 'all', label: 'All deals' },
{ value: 'sale', label: 'Sales' },
{ value: 'hire', label: 'Hires' },
{ value: 'attention', label: 'Needs attention' }];


export function Deals() {
  const { deals } = useDeals();
  const [filter, setFilter] = useState<Filter>('all');
  const [composerOpen, setComposerOpen] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const visible = useMemo(() => {
    if (filter === 'sale' || filter === 'hire') {
      return deals.filter((deal) => deal.type === filter);
    }
    if (filter === 'attention') {
      return deals.filter(
        (deal) =>
        deal.stage === 'details-in' && !deal.signedAt ||
        deal.stage === 'signed' && deal.paymentStatus === 'unpaid' ||
        deal.stage === 'enquiry'
      );
    }
    return deals;
  }, [deals, filter]);

  const collected = deals.reduce((sum, deal) => sum + deal.amountPaid, 0);
  const awaitingSignature = deals.filter(
    (deal) => !deal.signedAt && deal.stage !== 'enquiry' && deal.stage !== 'delivered'
  ).length;
  const awaitingPayment = deals.filter(
    (deal) => deal.paymentStatus === 'unpaid' && deal.stage !== 'enquiry'
  );
  const outstanding = awaitingPayment.reduce(
    (sum, deal) => sum + deal.depositDue - deal.amountPaid,
    0
  );

  const liveLinks = deals.
  filter((deal) => deal.stage !== 'delivered').
  slice(0, 5);

  const feed = deals.
  flatMap((deal) => deal.activity.map((item) => ({ ...item, deal }))).
  sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()).
  slice(0, 8);

  const copy = async (deal: Deal) => {
    try {
      await navigator.clipboard.writeText(paymentUrl(deal));
      setCopiedToken(deal.token);
      window.setTimeout(() => setCopiedToken(null), 2000);
    } catch {
      setCopiedToken(null);
    }
  };

  return (
    <div className="mx-auto max-w-shell px-5 py-10 lg:px-8 lg:py-14">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs font-medium text-ink-600">Staff console · signed in as Grace Njeri</p>
          <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight text-ink lg:text-6xl">
            Deals in motion
          </h1>
          <p className="mt-3 max-w-xl text-base text-ink-600">
            Every enquiry becomes one link that collects the customer’s details, gets the agreement
            signed and takes the deposit — so nothing waits on a printer.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setComposerOpen((value) => !value)}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-forest">
          
          <PlusIcon className="h-4 w-4" aria-hidden="true" />
          New payment link
        </button>
      </div>

      {composerOpen && <NewLinkPanel onClose={() => setComposerOpen(false)} />}

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="rounded-2xl bg-ink p-6 text-bone lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-bright">
            Collected through links · last 30 days
          </p>
          <p className="mt-4 font-display text-5xl leading-none tracking-tight lg:text-6xl">
            {formatShortKES(collected)}
          </p>
          <p className="mt-4 max-w-sm text-sm text-bone/60">
            Across {deals.filter((deal) => deal.amountPaid > 0).length} deals. M-Pesa clears in
            seconds, card and bank transfers show here as soon as they settle.
          </p>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-bone-line bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-600">
            Awaiting signature
          </p>
          <p className="mt-4 font-display text-4xl tracking-tight text-ink">{awaitingSignature}</p>
          <p className="mt-3 text-sm text-ink-600">
            Agreements sent and opened, not yet signed. Nudge after 24 hours.
          </p>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-bone-line bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-600">
            Deposits outstanding
          </p>
          <p className="mt-4 font-display text-4xl tracking-tight text-ink">
            {formatShortKES(outstanding)}
          </p>
          <p className="mt-3 text-sm text-ink-600">
            {awaitingPayment.length} links live and unpaid. Reservation holds expire at 72 hours.
          </p>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-2">
        {filters.map((option) =>
        <button
          key={option.value}
          type="button"
          onClick={() => setFilter(option.value)}
          aria-pressed={filter === option.value}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150 ease-swift ${
          filter === option.value ?
          'bg-forest text-bone' :
          'bg-bone-dim text-ink-600 hover:text-ink'}`
          }>
          
            {option.label}
          </button>
        )}
        <span className="ml-auto text-sm text-ink-600" role="status">
          {visible.length} of {deals.length} deals shown
        </span>
      </div>

      <div className="mt-6">
        <PipelineBoard deals={visible} />
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <section>
          <h2 className="font-display text-3xl tracking-tight text-ink">Live payment links</h2>
          <ul className="mt-5 divide-y divide-bone-line border-y border-bone-line">
            {liveLinks.map((deal) =>
            <li key={deal.id} className="flex flex-wrap items-center gap-x-4 gap-y-3 py-4">
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                    {deal.customer.name || 'Unnamed enquiry'}
                    {deal.signedAt &&
                  <FileSignatureIcon
                    className="h-3.5 w-3.5 text-forest"
                    aria-label="Agreement signed" />

                  }
                  </p>
                  <p className="truncate text-xs text-ink-600">
                    {paymentUrl(deal)} · {formatKES(deal.depositDue)} · sent{' '}
                    {timeAgo(deal.createdAt)}
                  </p>
                </div>
                <PaymentPill status={deal.paymentStatus} />
                <button
                type="button"
                onClick={() => copy(deal)}
                className="inline-flex items-center gap-1.5 rounded-full border border-bone-line px-3 py-1.5 text-xs font-semibold text-ink transition-colors duration-150 ease-swift hover:border-ink">
                
                  {copiedToken === deal.token ?
                <CheckIcon className="h-3.5 w-3.5" /> :

                <CopyIcon className="h-3.5 w-3.5" />
                }
                  {copiedToken === deal.token ? 'Copied' : 'Copy'}
                </button>
                <Link
                to={`/deals/${deal.id}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-forest underline underline-offset-4">
                
                  Open
                  <ArrowUpRightIcon className="h-3 w-3" aria-hidden="true" />
                </Link>
              </li>
            )}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-3xl tracking-tight text-ink">Latest activity</h2>
          <ol className="mt-5 space-y-5 border-l border-bone-line pl-6">
            {feed.map((item) =>
            <li key={`${item.deal.id}-${item.id}`} className="relative">
                <span
                className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-forest"
                aria-hidden="true" />
              
                <p className="text-sm text-ink">{item.label}</p>
                <p className="mt-1 text-xs text-ink-600">
                  <Link
                  to={`/deals/${item.deal.id}`}
                  className="font-semibold text-forest underline underline-offset-2">
                  
                    {item.deal.ref}
                  </Link>{' '}
                  · {item.actor} · {timeAgo(item.at)}
                </p>
              </li>
            )}
          </ol>
        </section>
      </div>
    </div>);

}
