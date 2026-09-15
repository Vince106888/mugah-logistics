import {
  ArrowRightIcon,
  CreditCardIcon,
  LandmarkIcon,
  MessageCircleIcon,
  ShieldCheckIcon,
  SmartphoneIcon
} from 'lucide-react';
import { company } from '../data/site';
import { whatsappUrl } from '../utils/contact';

const methods = [
  {
    icon: SmartphoneIcon,
    name: 'M-Pesa Send Money',
    status: 'Available now',
    detail: `Pay to ${company.mpesa} after our team confirms availability and sends a link with your exact amount and reference.`,
    action: 'Request M-Pesa link',
    message: 'Hello Mugah Logistics, please send me an M-Pesa payment link with the confirmed amount and reference.'
  },
  {
    icon: CreditCardIcon,
    name: 'Debit or credit card',
    status: 'Secure link on request',
    detail: 'Ask for a hosted card checkout link for Visa or Mastercard. Never send your card number, expiry date or CVV in a message.',
    action: 'Request card link',
    message: 'Hello Mugah Logistics, please send me a secure hosted card payment link for my booking or vehicle deposit.'
  },
  {
    icon: LandmarkIcon,
    name: 'Bank transfer',
    status: 'Invoice on request',
    detail: 'We issue a written invoice with verified account details and a unique reference for vehicle purchases, hires and corporate bookings.',
    action: 'Request an invoice',
    message: 'Hello Mugah Logistics, please send me an invoice and verified bank-transfer instructions.'
  }
];

export function Payments() {
  return (
    <>
      <section className="border-b border-bone-line bg-bone-dim">
        <div className="mx-auto grid max-w-shell gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:px-8 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">Payments</p>
            <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight tracking-tight text-ink lg:text-7xl">
              Pay through a link you can verify.
            </h1>
          </div>
          <div className="rounded-2xl bg-ink p-6 text-bone">
            <ShieldCheckIcon className="h-6 w-6 text-amber-bright" aria-hidden="true" />
            <p className="mt-4 text-base font-semibold">Confirm the details before you pay</p>
            <p className="mt-2 text-sm leading-relaxed text-bone/65">
              Only use a link issued for your booking or vehicle. Check the amount and reference, and never share an M-Pesa PIN, card PIN, CVV or one-time code with us.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-shell px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-5 lg:grid-cols-3">
          {methods.map((method) => (
            <article key={method.name} className="flex flex-col rounded-2xl border border-bone-line bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-pale text-forest">
                  <method.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="rounded-full bg-amber-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink">
                  {method.status}
                </span>
              </div>
              <h2 className="mt-6 font-display text-3xl tracking-tight text-ink">{method.name}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{method.detail}</p>
              <a
                href={whatsappUrl(method.message)}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-bone transition-colors hover:bg-ink">
                <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
                {method.action}
              </a>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-8 rounded-2xl border border-bone-line bg-bone-dim p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">How payment links work</p>
            <h2 className="mt-3 font-display text-4xl leading-tight tracking-tight text-ink">One reference. A clear audit trail.</h2>
          </div>
          <ol className="space-y-5">
            {[
              'Choose a vehicle or hire date and confirm availability with the team.',
              'Receive a link or invoice showing the agreed amount, vehicle and unique reference.',
              'Pay through M-Pesa, the hosted card provider or your bank, then keep the confirmation.'
            ].map((step, index) => (
              <li key={step} className="flex gap-4 text-sm leading-relaxed text-ink-600">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-bone">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl bg-forest px-6 py-7 text-bone sm:flex-row sm:items-center lg:px-9">
          <div>
            <p className="font-display text-3xl tracking-tight">Already have a payment link?</p>
            <p className="mt-1 text-sm text-bone/70">Open the exact link sent by our team; it contains your amount and reference.</p>
          </div>
          <a
            href={whatsappUrl('Hello Mugah Logistics, please verify or resend my payment link.')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-amber-bright px-6 py-3 text-sm font-semibold text-ink">
            Verify my link
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
