import { useMemo, useState } from 'react';
import { CheckIcon, CopyIcon, MessageCircleIcon, ShieldAlertIcon, SmartphoneIcon } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { company } from '../data/site';
import { formatKES } from '../utils/format';
import { whatsappUrl } from '../utils/contact';

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
      className="inline-flex items-center gap-1.5 rounded-full border border-bone-line px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-ink">
      {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
      {copied ? 'Copied' : `Copy ${label}`}
    </button>
  );
}

export function Pay() {
  const [params] = useSearchParams();
  const [transactionCode, setTransactionCode] = useState('');
  const amount = Number(params.get('amount'));
  const reference = (params.get('ref') ?? '').trim().toUpperCase();
  const item = (params.get('for') ?? '').trim().slice(0, 120);
  const valid = Number.isInteger(amount) && amount > 0 && amount <= 100_000_000 && /^[A-Z0-9-]{3,32}$/.test(reference);
  const codeValid = /^[A-Z0-9]{10}$/.test(transactionCode);

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

  if (!valid) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-shell items-center px-5 py-20 lg:px-8">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">Payment link unavailable</p>
          <h1 className="mt-4 font-display text-5xl leading-tight tracking-tight text-ink">Ask us for a fresh payment link.</h1>
          <p className="mt-5 text-base leading-relaxed text-ink-600">
            This link is missing a valid amount or reference. Do not send money from instructions copied from an incomplete link.
          </p>
          <a
            href={whatsappUrl('Hello Mugah Logistics, please send me a valid M-Pesa payment link.')}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-bone">
            <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
            Request a link on WhatsApp
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            <SmartphoneIcon className="h-4 w-4" aria-hidden="true" />
            M-Pesa · Send Money
          </p>
          <h1 className="mt-4 font-display text-5xl leading-tight tracking-tight text-ink lg:text-6xl">Complete your M-Pesa payment.</h1>
          <p className="mt-5 text-base leading-relaxed text-ink-600">
            This page gives you the exact recipient, amount and reference. The transfer happens inside M-Pesa—not on this website.
          </p>

          <dl className="mt-8 divide-y divide-bone-line rounded-2xl border border-bone-line bg-white px-5 sm:px-7">
            <div className="flex flex-wrap items-center justify-between gap-3 py-5">
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-ink-600">Send Money to</dt>
                <dd className="mt-1 text-xl font-semibold text-ink">{company.mpesa}</dd>
              </div>
              <CopyButton label="number" value={company.mpesa.replace(/\s/g, '')} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 py-5">
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-ink-600">Amount</dt>
                <dd className="mt-1 font-display text-3xl tracking-tight text-forest">{formatKES(amount)}</dd>
              </div>
              <CopyButton label="amount" value={String(amount)} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 py-5">
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-ink-600">Our reference</dt>
                <dd className="mt-1 text-lg font-semibold text-ink">{reference}</dd>
                {item && <dd className="mt-1 text-sm text-ink-600">{item}</dd>}
              </div>
              <CopyButton label="reference" value={reference} />
            </div>
          </dl>

          <ol className="mt-8 space-y-5 border-l border-bone-line pl-7">
            {[
              <>Open M-Pesa and choose <strong className="text-ink">Send Money</strong>.</>,
              <>Enter <strong className="text-ink">{company.mpesa}</strong> and the amount <strong className="text-ink">{formatKES(amount)}</strong>.</>,
              <>Before entering your PIN, confirm the recipient name shown by M-Pesa is the person or business you expect. Cancel if it is not.</>,
              <>After M-Pesa confirms the transfer, enter the 10-character transaction code below and send it to us for verification.</>
            ].map((step, index) => (
              <li key={index} className="relative text-sm leading-relaxed text-ink-600">
                <span className="absolute -left-10 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-bone">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl bg-ink p-6 text-bone lg:p-7">
            <h2 className="font-display text-3xl tracking-tight">Confirm after paying</h2>
            <p className="mt-3 text-sm leading-relaxed text-bone/65">
              The transaction code lets the team match your transfer to {reference}. We verify it against the recipient's M-Pesa statement before marking anything paid.
            </p>
            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-medium">M-Pesa transaction code</span>
              <input
                value={transactionCode}
                onChange={(event) => setTransactionCode(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10))}
                autoComplete="off"
                inputMode="text"
                placeholder="e.g. TIA4BC12DE"
                className="h-12 w-full rounded-lg border border-white/20 bg-white/10 px-3 text-base font-semibold uppercase tracking-wider text-bone placeholder:text-bone/35 focus:border-amber-bright focus:outline-none" />
            </label>
            <a
              href={codeValid ? confirmationUrl : undefined}
              target={codeValid ? '_blank' : undefined}
              rel={codeValid ? 'noreferrer' : undefined}
              aria-disabled={!codeValid}
              className={`mt-4 flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                codeValid ? 'bg-amber-bright text-ink hover:bg-amber' : 'cursor-not-allowed bg-white/10 text-bone/40'
              }`}>
              <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
              Send confirmation on WhatsApp
            </a>
            <p className="mt-3 text-xs text-bone/50">A valid M-Pesa code has 10 letters and numbers.</p>
          </div>

          <p className="mt-5 flex items-start gap-2.5 rounded-xl bg-amber-soft px-4 py-4 text-xs leading-relaxed text-ink-600">
            <ShieldAlertIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
            Mugah Logistics will never ask for your M-Pesa PIN. This page cannot debit your phone or automatically confirm a payment.
          </p>
          <Link to="/contact" className="mt-5 inline-flex text-sm font-semibold text-forest underline underline-offset-4">Need help before paying?</Link>
        </aside>
      </div>
    </section>
  );
}
