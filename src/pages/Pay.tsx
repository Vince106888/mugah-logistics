import { FormEvent, useMemo, useState } from 'react';
import {
  CheckCircle2Icon,
  CheckIcon,
  CopyIcon,
  CreditCardIcon,
  LandmarkIcon,
  LoaderCircleIcon,
  MessageCircleIcon,
  ShieldCheckIcon,
  SmartphoneIcon
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { siteConfig } from '../config';
import { company } from '../data/site';
import { whatsappUrl } from '../utils/contact';
import { formatKES } from '../utils/format';
import { startCheckout } from '../utils/payments';

type PaymentMethod = 'mpesa' | 'card' | 'bank';

function CopyButton({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-bone-line px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-ink">
      {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
      {copied ? 'Copied' : `Copy ${label}`}
    </button>
  );
}

export function Pay() {
  const [params] = useSearchParams();
  const amount = Number(params.get('amount'));
  const reference = (params.get('ref') ?? '').trim().toUpperCase();
  const item = (params.get('for') ?? '').trim().slice(0, 120);
  const valid = Number.isInteger(amount) && amount > 0 && amount <= 100_000_000 && /^[A-Z0-9-]{3,32}$/.test(reference);

  const [method, setMethod] = useState<PaymentMethod>('mpesa');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [transactionCode, setTransactionCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const codeValid = /^[A-Z0-9]{10}$/.test(transactionCode);
  const bankConfigured = Boolean(
    siteConfig.payments.bankName &&
    siteConfig.payments.bankAccountName &&
    siteConfig.payments.bankAccountNumber
  );

  const confirmationUrl = useMemo(
    () => whatsappUrl([
      'Hello Mugah Logistics, I have completed an M-Pesa payment.',
      `Amount: ${valid ? formatKES(amount) : ''}`,
      `Reference: ${reference}`,
      item ? `For: ${item}` : '',
      transactionCode ? `M-Pesa code: ${transactionCode}` : ''
    ].filter(Boolean).join('\n')),
    [amount, item, reference, transactionCode, valid]
  );

  const requestPayment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setFeedback('');

    const endpoint = method === 'mpesa'
      ? siteConfig.payments.mpesaStkEndpoint
      : siteConfig.payments.cardSessionEndpoint;

    if (!endpoint) {
      setError(
        method === 'mpesa'
          ? 'STK Push is awaiting the Safaricom Daraja connection. Use Send Money below for now.'
          : 'Card checkout is awaiting your acquiring-bank connection.'
      );
      return;
    }
    if (!name.trim() || phone.replace(/\D/g, '').length < 9) {
      setError('Enter your name and a valid mobile number.');
      return;
    }
    if (method === 'card' && !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email for the card receipt.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await startCheckout(endpoint, {
        amount,
        reference,
        description: item || 'Mugah Logistics payment',
        customer: { name: name.trim(), phone: phone.trim(), email: email.trim() }
      });
      if (response.checkoutUrl) {
        const checkoutUrl = new URL(response.checkoutUrl, window.location.origin);
        if (checkoutUrl.protocol !== 'https:' && checkoutUrl.hostname !== 'localhost') {
          throw new Error('The card checkout returned an insecure address.');
        }
        window.location.assign(checkoutUrl.toString());
        return;
      }
      setFeedback(response.message || 'Request received. Check your phone to continue.');
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'Payment could not be started.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!valid) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-shell items-center px-5 py-16 lg:px-8 lg:py-20">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">Payment link unavailable</p>
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">Ask us for a fresh payment link.</h1>
          <p className="mt-5 text-base leading-relaxed text-ink-600">
            This link is missing a valid amount or reference. Do not pay using instructions copied from an incomplete link.
          </p>
          <a
            href={whatsappUrl('Hello Mugah Logistics, please send me a valid payment link.')}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-bone">
            <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
            Request a payment link
          </a>
        </div>
      </section>
    );
  }

  const methods = [
    { id: 'mpesa' as const, label: 'M-Pesa', note: 'STK or Send Money', icon: SmartphoneIcon },
    { id: 'card' as const, label: 'Card', note: 'Visa or Mastercard', icon: CreditCardIcon },
    { id: 'bank' as const, label: 'Bank', note: 'Account transfer', icon: LandmarkIcon }
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-5 sm:py-12 lg:px-8 lg:py-20">
      <div className="mb-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-forest">
        <ShieldCheckIcon className="h-4 w-4" aria-hidden="true" />
        Secure Mugah payment link
      </div>

      <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-bone-line bg-white p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-600">Payment summary</p>
            <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-ink">{item || 'Mugah Logistics payment'}</h1>
            <dl className="mt-6 divide-y divide-bone-line border-y border-bone-line">
              <div className="flex items-center justify-between gap-4 py-4">
                <dt className="text-sm text-ink-600">Amount due</dt>
                <dd className="font-display text-3xl tracking-tight text-forest">{formatKES(amount)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-4">
                <div>
                  <dt className="text-sm text-ink-600">Reference</dt>
                  <dd className="mt-1 font-semibold text-ink">{reference}</dd>
                </div>
                <CopyButton label="reference" value={reference} />
              </div>
            </dl>
            <p className="mt-5 text-xs leading-relaxed text-ink-600">
              Confirm the amount and reference before continuing. Mugah Logistics will never ask for your PIN, CVV or one-time password.
            </p>
          </div>
        </aside>

        <div>
          <h2 className="font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">Choose how to pay</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">Your payment stays tied to reference <strong className="text-ink">{reference}</strong>.</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3" role="group" aria-label="Payment method">
            {methods.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setMethod(option.id);
                  setError('');
                  setFeedback('');
                }}
                aria-pressed={method === option.id}
                className={`min-h-24 rounded-xl border p-4 text-left transition-colors ${
                  method === option.id ? 'border-forest bg-forest-pale' : 'border-bone-line bg-white hover:border-ink-600'
                }`}>
                <option.icon className="h-5 w-5 text-forest" aria-hidden="true" />
                <span className="mt-3 block text-sm font-semibold text-ink">{option.label}</span>
                <span className="mt-0.5 block text-xs text-ink-600">{option.note}</span>
              </button>
            ))}
          </div>

          {method !== 'bank' && (
            <form onSubmit={requestPayment} className="mt-5 rounded-2xl bg-ink p-5 text-bone sm:p-7" noValidate>
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
                <div>
                  <h3 className="font-display text-3xl tracking-tight">{method === 'mpesa' ? 'Send an STK Push' : 'Continue to card checkout'}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-bone/65">
                    {method === 'mpesa'
                      ? 'Enter the Safaricom number that should receive the payment prompt.'
                      : 'Your acquiring bank will tokenize the card; Mugah never stores card numbers or CVVs.'}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-bone/70">
                  {method === 'mpesa'
                    ? siteConfig.payments.mpesaStkEndpoint ? 'Connected' : 'Placeholder'
                    : siteConfig.payments.cardSessionEndpoint ? 'Connected' : 'Placeholder'}
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-bone/70">Full name</span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    className="h-12 w-full rounded-lg border border-white/20 bg-white/10 px-3 text-base text-bone placeholder:text-bone/35 focus:border-amber-bright focus:outline-none"
                    placeholder="Your name" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-bone/70">Mobile number</span>
                  <input
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    autoComplete="tel"
                    inputMode="tel"
                    className="h-12 w-full rounded-lg border border-white/20 bg-white/10 px-3 text-base text-bone placeholder:text-bone/35 focus:border-amber-bright focus:outline-none"
                    placeholder="07XX XXX XXX" />
                </label>
              </div>
              {method === 'card' && (
                <label className="mt-4 block">
                  <span className="mb-2 block text-xs font-medium text-bone/70">Receipt email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    inputMode="email"
                    className="h-12 w-full rounded-lg border border-white/20 bg-white/10 px-3 text-base text-bone placeholder:text-bone/35 focus:border-amber-bright focus:outline-none"
                    placeholder="you@example.com" />
                </label>
              )}

              {error && <p className="mt-4 rounded-lg bg-amber-soft px-4 py-3 text-sm text-ink" role="alert">{error}</p>}
              {feedback && <p className="mt-4 flex items-start gap-2 rounded-lg bg-forest-pale px-4 py-3 text-sm text-ink" role="status"><CheckCircle2Icon className="mt-0.5 h-4 w-4 shrink-0 text-forest" />{feedback}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-amber-bright px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-amber disabled:opacity-60">
                {submitting && <LoaderCircleIcon className="h-4 w-4 animate-spin" aria-hidden="true" />}
                {method === 'mpesa' ? 'Send STK Push' : 'Continue securely'}
              </button>
            </form>
          )}

          {method === 'mpesa' && (
            <div className="mt-5 rounded-2xl border border-bone-line bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-600">Send Money fallback</p>
                  <p className="mt-1 text-xl font-semibold text-ink">{company.mpesa}</p>
                </div>
                <CopyButton label="number" value={company.mpesa.replace(/\s/g, '')} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-600">
                Send exactly {formatKES(amount)}, then enter the 10-character M-Pesa code below for verification.
              </p>
              <label className="mt-5 block">
                <span className="mb-2 block text-xs font-medium text-ink-600">M-Pesa transaction code</span>
                <input
                  value={transactionCode}
                  onChange={(event) => setTransactionCode(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10))}
                  autoComplete="off"
                  placeholder="e.g. TIA4BC12DE"
                  className="h-12 w-full rounded-lg border border-bone-line bg-bone px-3 text-base font-semibold uppercase tracking-wider text-ink placeholder:text-ink-600/60 focus:border-forest focus:outline-none" />
              </label>
              <a
                href={codeValid ? confirmationUrl : undefined}
                target={codeValid ? '_blank' : undefined}
                rel={codeValid ? 'noreferrer' : undefined}
                aria-disabled={!codeValid}
                className={`mt-4 flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold ${codeValid ? 'bg-forest text-bone' : 'cursor-not-allowed bg-bone-dim text-ink-600/50'}`}>
                <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
                Confirm manual payment
              </a>
            </div>
          )}

          {method === 'bank' && (
            <div className="mt-5 rounded-2xl border border-bone-line bg-white p-5 sm:p-7">
              <h3 className="font-display text-3xl tracking-tight text-ink">Bank transfer details</h3>
              {bankConfigured ? (
                <dl className="mt-5 divide-y divide-bone-line border-y border-bone-line text-sm">
                  {[
                    ['Bank', siteConfig.payments.bankName],
                    ['Account name', siteConfig.payments.bankAccountName],
                    ['Account number', siteConfig.payments.bankAccountNumber],
                    ['Branch', siteConfig.payments.bankBranch || '—'],
                    ['Reference', reference],
                    ['Amount', formatKES(amount)]
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-5 py-3"><dt className="text-ink-600">{label}</dt><dd className="text-right font-semibold text-ink">{value}</dd></div>
                  ))}
                </dl>
              ) : (
                <div className="mt-5 rounded-xl bg-amber-soft p-4 text-sm leading-relaxed text-ink-600">
                  Bank account placeholders are ready. Add the verified account details in the hosting environment before enabling transfers.
                </div>
              )}
              <a
                href={whatsappUrl(`Hello Mugah Logistics, please send me the verified bank details for ${reference}, amount ${formatKES(amount)}.`)}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-lg bg-forest px-5 py-3 text-sm font-semibold text-bone">
                <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
                Verify bank details
              </a>
            </div>
          )}

          <Link to="/contact" className="mt-6 inline-flex text-sm font-semibold text-forest underline underline-offset-4">Need help before paying?</Link>
        </div>
      </div>
    </section>
  );
}
