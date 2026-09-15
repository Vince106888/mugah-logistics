import { Link } from 'react-router-dom';
import { FileSignatureIcon, LinkIcon } from 'lucide-react';
import type { Deal } from '../../types/deal';
import { stageMeta, stageOrder, timeAgo, initials } from '../../utils/deal';
import { formatShortKES } from '../../utils/format';
import { PaymentPill } from './StatusPill';

interface PipelineBoardProps {
  deals: Deal[];
}

export function PipelineBoard({ deals }: PipelineBoardProps) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 pb-2 lg:-mx-8 lg:px-8">
      <ol className="flex min-w-max gap-4">
        {stageOrder.map((stage) => {
          const column = deals.filter((deal) => deal.stage === stage);
          const value = column.reduce((sum, deal) => sum + deal.depositDue - deal.amountPaid, 0);
          return (
            <li key={stage} className="w-[290px] shrink-0">
              <div className="flex items-baseline justify-between gap-3 border-b-2 border-ink pb-2.5">
                <h3 className="text-sm font-semibold text-ink">{stageMeta[stage].label}</h3>
                <span className="text-xs font-semibold text-ink-600">{column.length}</span>
              </div>
              <p className="pt-2 text-xs text-ink-600">
                {value > 0 ? `${formatShortKES(value)} outstanding` : stageMeta[stage].hint}
              </p>

              <ul className="mt-3 space-y-3">
                {column.map((deal) =>
                <li key={deal.id}>
                    <Link
                    to={`/deals/${deal.id}`}
                    className="block rounded-xl border border-bone-line bg-white p-4 transition-colors duration-150 ease-swift hover:border-ink">
                    
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-600">
                          {deal.ref} · {deal.type === 'hire' ? 'Hire' : 'Sale'}
                        </span>
                        <span
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-bone-dim text-[10px] font-bold text-ink-600"
                        title={`Owned by ${deal.owner}`}>
                        
                          {initials(deal.owner)}
                        </span>
                      </div>
                      <p className="mt-2 text-base font-semibold leading-tight text-ink">
                        {deal.customer.name || 'Unnamed enquiry'}
                      </p>
                      <p className="mt-1 truncate text-xs text-ink-600">{deal.vehicleLabel}</p>

                      <div className="mt-3 flex items-end justify-between gap-3 border-t border-bone-line pt-3">
                        <span>
                          <span className="block text-[10px] uppercase tracking-[0.14em] text-ink-600">
                            Deposit
                          </span>
                          <span className="text-sm font-semibold text-ink">
                            {formatShortKES(deal.depositDue)}
                          </span>
                        </span>
                        <PaymentPill status={deal.paymentStatus} />
                      </div>

                      <div className="mt-3 flex items-center gap-3 text-[11px] text-ink-600">
                        <span className="inline-flex items-center gap-1">
                          <LinkIcon className="h-3 w-3" aria-hidden="true" />
                          /{deal.token}
                        </span>
                        {deal.signedAt &&
                      <span className="inline-flex items-center gap-1 text-forest">
                            <FileSignatureIcon className="h-3 w-3" aria-hidden="true" />
                            Signed
                          </span>
                      }
                        <span className="ml-auto">{timeAgo(deal.updatedAt)}</span>
                      </div>
                    </Link>
                  </li>
                )}

                {column.length === 0 &&
                <li className="rounded-xl border border-dashed border-bone-line px-4 py-6 text-center text-xs text-ink-600">
                    Nothing here
                  </li>
                }
              </ul>
            </li>);

        })}
      </ol>
    </div>);

}
