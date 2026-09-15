import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  CheckIcon,
  CreditCardIcon,
  LandmarkIcon,
  LockIcon,
  ShieldCheckIcon,
  SmartphoneIcon
} from 'lucide-react';
import { company } from '../../data/site';

const capabilities = [
  {
    icon: SmartphoneIcon,
    title: 'M-Pesa with a unique reference',
    body: `Your link shows the agreed amount, vehicle and reference before you send money to ${company.mpesa}.`
  },
  {
    icon: CreditCardIcon,
    title: 'Secure card links on request',
    body: 'For Visa or Mastercard, the team sends a hosted checkout link. Card details are never collected by this website or through chat.'
  },
  {
    icon: LandmarkIcon,
    title: 'Verified invoices for bank transfer',
    body: 'Vehicle purchases, longer hires and corporate bookings can be paid against a written invoice with a matching reference.'
  }
];

export function DigitalDeal() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-shell px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-bright">Payment options</p>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight text-bone lg:text-5xl">
              Pay from wherever you are.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-bone/70">
              Once availability and price are confirmed, we send a payment link or invoice tied to your vehicle and reference. Choose M-Pesa, a hosted card checkout or bank transfer.
            </p>

            <ol className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {capabilities.map((item) => (
                <li key={item.title} className="flex gap-5 py-6">
                  <item.icon className="mt-1 h-5 w-5 shrink-0 text-amber-bright" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold text-bone">{item.title}</h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-bone/60">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Link
              to="/payments"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-bright px-6 py-3 text-sm font-semibold text-ink transition-colors duration-150 ease-swift hover:bg-amber">
              View payment options
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="rounded-2xl bg-bone p-4 shadow-2xl shadow-black/30 sm:p-6">
            <div className="flex items-center gap-2 border-b border-bone-line pb-4">
              <LockIcon className="h-3.5 w-3.5 text-forest" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-600">Verified payment choices</p>
              <span className="ml-auto rounded-full bg-forest-pale px-2.5 py-1 text-[10px] font-semibold text-forest">Secure</span>
            </div>

            <h3 className="mt-6 font-display text-3xl leading-tight tracking-tight text-ink">Choose how you want to pay</h3>
            <div className="mt-6 space-y-3">
              {[
                { icon: SmartphoneIcon, label: 'M-Pesa Send Money', note: company.mpesa, active: true },
                { icon: CreditCardIcon, label: 'Visa or Mastercard', note: 'Hosted link on request', active: false },
                { icon: LandmarkIcon, label: 'Bank transfer', note: 'Verified invoice', active: false }
              ].map((method) => (
                <div key={method.label} className={`flex items-center gap-4 rounded-xl border p-4 ${method.active ? 'border-forest bg-forest-pale' : 'border-bone-line bg-white'}`}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-forest">
                    <method.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">{method.label}</p>
                    <p className="mt-0.5 text-xs text-ink-600">{method.note}</p>
                  </div>
                  <CheckIcon className="ml-auto h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
                </div>
              ))}
            </div>

            <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-ink-600">
              <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
              Every payment is matched to the agreed amount and reference before a booking or sale is marked paid.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
