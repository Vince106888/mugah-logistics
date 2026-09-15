import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  CheckIcon,
  FileSignatureIcon,
  LockIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  UserRoundCheckIcon } from
'lucide-react';
import { deals } from '../../data/deals';
import { paymentPath, paymentUrl } from '../../utils/deal';
import { formatKES } from '../../utils/format';
import { siteConfig } from '../../config';

const demo = deals[0];

const capabilities = [
{
  icon: UserRoundCheckIcon,
  title: 'Your details once, on your phone',
  body: 'ID, KRA PIN, licence and next of kin captured through the link. No forms at the yard, no photocopies, no queue at the counter.'
},
{
  icon: FileSignatureIcon,
  title: 'Sign with your finger',
  body: 'The agreement and inspection report travel with the link. You sign on screen and get a countersigned PDF back in seconds.'
},
{
  icon: SmartphoneIcon,
  title: 'Pay by M-Pesa, card or transfer',
  body: 'An STK push straight to your phone, or Visa and Mastercard in KES. The receipt lands before you have put the phone down.'
}];


export function DigitalDeal() {
  if (!siteConfig.demoFeaturesEnabled) return null;

  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-shell px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-20">
          <div>
            <h2 className="font-display text-4xl leading-tight tracking-tight text-bone lg:text-5xl">
              One link closes the whole deal.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-bone/70">
              Buying or hiring from us does not mean an afternoon of paperwork. We send you a secure
              link: you fill your details, sign the agreement and pay the deposit from wherever you
              are. Every step is logged, so nobody has to ask you for the same document twice.
            </p>

            <ol className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {capabilities.map((item) =>
              <li key={item.title} className="flex gap-5 py-6">
                  <item.icon
                  className="mt-1 h-5 w-5 shrink-0 text-amber-bright"
                  aria-hidden="true" />
                
                  <div>
                    <h3 className="text-lg font-semibold text-bone">{item.title}</h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-bone/60">
                      {item.body}
                    </p>
                  </div>
                </li>
              )}
            </ol>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to={paymentPath(demo)}
                className="inline-flex items-center gap-2 rounded-full bg-amber-bright px-6 py-3 text-sm font-semibold text-ink transition-colors duration-150 ease-swift hover:bg-amber">
                
                See a live payment link
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/deals"
                className="inline-flex items-center gap-2 text-sm font-semibold text-bone underline decoration-amber-bright decoration-2 underline-offset-8 transition-colors duration-150 ease-swift hover:text-amber-bright">
                
                Staff deal console
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-bone p-4 shadow-2xl shadow-black/30 sm:p-6">
            <div className="flex items-center gap-2 border-b border-bone-line pb-4">
              <LockIcon className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
              <code className="truncate text-xs text-ink-600">{paymentUrl(demo)}</code>
              <span className="ml-auto shrink-0 rounded-full bg-forest-pale px-2.5 py-1 text-[10px] font-semibold text-forest">
                {demo.ref}
              </span>
            </div>

            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-600">
              Step 2 of 3 · Sign the agreement
            </p>
            <h3 className="mt-2 font-display text-2xl leading-tight tracking-tight text-ink">
              {demo.vehicleLabel}
            </h3>

            <div className="mt-5 rounded-xl border border-bone-line bg-white p-4">
              <p className="text-xs text-ink-600">Signature of {demo.customer.name}</p>
              <p className="mt-2 font-display text-3xl italic tracking-tight text-ink">
                {demo.signatureName}
              </p>
              <p className="mt-3 flex items-center gap-1.5 border-t border-bone-line pt-3 text-[11px] text-forest">
                <ShieldCheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
                Signed &amp; timestamped · audit trail stored
              </p>
            </div>

            <dl className="mt-5 divide-y divide-bone-line border-y border-bone-line">
              <div className="flex justify-between gap-4 py-3 text-sm">
                <dt className="text-ink-600">Vehicle price</dt>
                <dd className="font-medium text-ink">{formatKES(demo.totalAmount)}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3 text-sm">
                <dt className="text-ink-600">Deposit due now</dt>
                <dd className="font-semibold text-forest">{formatKES(demo.depositDue)}</dd>
              </div>
            </dl>

            <ul className="mt-4 space-y-2 text-xs text-ink-600">
              {['M-Pesa STK push', 'Visa & Mastercard', 'Refundable for 24 hours'].map((item) =>
              <li key={item} className="flex items-center gap-2">
                  <CheckIcon className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
                  {item}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>);

}
