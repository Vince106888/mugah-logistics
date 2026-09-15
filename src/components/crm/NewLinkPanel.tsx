import React, { useState } from 'react';
import { CheckIcon, CopyIcon, MessageCircleIcon, XIcon } from 'lucide-react';
import { useDeals } from '../../contexts/DealsContext';
import { vehicles } from '../../data/vehicles';
import { paymentPath, paymentUrl } from '../../utils/deal';
import { formatKES } from '../../utils/format';

const owners = ['Grace Njeri', 'Amina Hassan', 'Joseph Mugah'];

interface NewLinkPanelProps {
  onClose: () => void;
}

export function NewLinkPanel({ onClose }: NewLinkPanelProps) {
  const { createDeal } = useDeals();
  const [type, setType] = useState<'sale' | 'hire'>('sale');
  const [slug, setSlug] = useState(vehicles[0].slug);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deposit, setDeposit] = useState('500000');
  const [owner, setOwner] = useState(owners[0]);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [created, setCreated] = useState<{
    ref: string;
    depositDue: number;
    vehicleLabel: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const vehicle = vehicles.find((item) => item.slug === slug) ?? vehicles[0];

  const handleCreate = (event: React.FormEvent) => {
    event.preventDefault();
    if (!customerName.trim() || phone.trim().length < 9 || Number(deposit) <= 0) {
      setError('Add a customer name, a phone number and the deposit you are requesting.');
      return;
    }
    setError('');
    const deal = createDeal({
      type,
      vehicleSlug: vehicle.slug,
      vehicleLabel: `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`,
      customerName,
      phone,
      totalAmount:
      type === 'hire' ? (vehicle.hireRate ?? 0) * 7 : vehicle.salePrice ?? Number(deposit),
      depositDue: Number(deposit),
      owner,
      notes
    });
    setCreated({
      ref: deal.ref,
      depositDue: deal.depositDue,
      vehicleLabel: deal.vehicleLabel
    });
  };

  const copyLink = async () => {
    if (!created) return;
    try {
      await navigator.clipboard.writeText(paymentUrl(created));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      aria-label="Create a payment link"
      className="mt-6 rounded-2xl border border-ink bg-white p-6 lg:p-8">
      
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="font-display text-3xl tracking-tight text-ink">New payment link</h2>
          <p className="mt-1 text-sm text-ink-600">
            Create a manual M-Pesa Send Money instruction with the agreed amount and reference.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bone-line text-ink-600 transition-colors duration-150 ease-swift hover:text-ink"
          aria-label="Close">
          
          <XIcon className="h-4 w-4" />
        </button>
      </div>

      {created ?
      <div className="mt-6 rounded-xl border border-forest/20 bg-forest-pale p-5">
          <p className="text-sm font-semibold text-forest">
            {created.ref} created — verify the amount before sharing
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <code className="flex-1 truncate rounded-lg border border-bone-line bg-white px-4 py-3 text-sm text-ink">
              {paymentUrl(created)}
            </code>
            <button
            type="button"
            onClick={copyLink}
            className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-forest">
            
              {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <a
            href={paymentPath(created)}
            className="inline-flex items-center gap-2 rounded-lg border border-ink px-4 py-3 text-sm font-semibold text-ink transition-colors duration-150 ease-swift hover:bg-bone-dim">
            
              <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
              Preview customer view
            </a>
          </div>
          <button
          type="button"
          onClick={onClose}
          className="mt-4 text-sm font-semibold text-forest underline underline-offset-4">
          
            Back to the pipeline
          </button>
        </div> :

      <form onSubmit={handleCreate} className="mt-6 space-y-5" noValidate>
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-ink">Deal type</legend>
            <div className="inline-flex rounded-full bg-bone-dim p-1">
              {(['sale', 'hire'] as const).map((option) =>
            <button
              key={option}
              type="button"
              onClick={() => setType(option)}
              className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition-colors duration-150 ease-swift ${
              type === option ? 'bg-forest text-bone' : 'text-ink-600 hover:text-ink'}`
              }>
              
                  {option}
                </button>
            )}
            </div>
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-sm font-medium text-ink">Vehicle</span>
              <select
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none">
              
                {vehicles.map((item) =>
              <option key={item.slug} value={item.slug}>
                    {item.year} {item.make} {item.model} — {item.trim}
                  </option>
              )}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink">Customer name</span>
              <input
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none" />
            
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink">Phone (for WhatsApp)</span>
              <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              inputMode="tel"
              placeholder="+254…"
              className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none" />
            
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink">Deposit requested</span>
              <input
              value={deposit}
              onChange={(event) => setDeposit(event.target.value.replace(/[^\d]/g, ''))}
              inputMode="numeric"
              className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none" />
            
              <span className="mt-1.5 block text-xs text-ink-600">
                {deposit ? formatKES(Number(deposit)) : 'Enter an amount in KES'}
              </span>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink">Owner</span>
              <select
              value={owner}
              onChange={(event) => setOwner(event.target.value)}
              className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none">
              
                {owners.map((option) =>
              <option key={option}>{option}</option>
              )}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-sm font-medium text-ink">
                Internal note <span className="font-normal text-ink-600">(not shown to customer)</span>
              </span>
              <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={2}
              className="w-full rounded-lg border border-bone-line bg-bone px-3 py-2.5 text-sm text-ink focus:border-forest focus:outline-none" />
            
            </label>
          </div>

          {error &&
        <p className="text-sm font-medium text-amber" role="alert">
              {error}
            </p>
        }

          <button
          type="submit"
          className="h-12 rounded-lg bg-ink px-8 text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-forest">
          
            Create M-Pesa payment link
          </button>
        </form>
      }
    </section>);

}
