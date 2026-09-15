import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BuildingIcon, CreditCardIcon, Loader2Icon, SmartphoneIcon } from 'lucide-react';
import type { Deal, PaymentMethod } from '../../types/deal';
import { formatKES } from '../../utils/format';

interface PaymentStepProps {
  deal: Deal;
  onPaid: (method: PaymentMethod, amount: number) => void;
}

const methods: {value: PaymentMethod;label: string;note: string;icon: typeof SmartphoneIcon;}[] =
[
{ value: 'mpesa', label: 'M-Pesa', note: 'STK push to your phone', icon: SmartphoneIcon },
{ value: 'card', label: 'Card', note: 'Visa or Mastercard', icon: CreditCardIcon },
{ value: 'bank', label: 'Bank transfer', note: 'RTGS or EFT details', icon: BuildingIcon }];


export function PaymentStep({ deal, onPaid }: PaymentStepProps) {
  const outstanding = Math.max(deal.depositDue - deal.amountPaid, 0);
  const [method, setMethod] = useState<PaymentMethod>('mpesa');
  const [phone, setPhone] = useState(deal.customer.phone);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [status, setStatus] = useState<'idle' | 'pending' | 'error'>('idle');
  const [error, setError] = useState('');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const pay = () => {
    if (method === 'mpesa' && phone.trim().length < 9) {
      setError('Enter the M-Pesa number to send the request to.');
      return;
    }
    if (method === 'card' && (cardNumber.replace(/\s/g, '').length < 13 || cvv.length < 3)) {
      setError('Check the card number and CVV.');
      return;
    }
    setError('');
    setStatus('pending');
    timer.current = window.setTimeout(() => {
      onPaid(method, outstanding);
    }, 2600);
  };

  return (
    <div>
      <h2 className="font-display text-3xl tracking-tight text-ink">Pay the deposit</h2>
      <p className="mt-3 rounded-lg bg-amber-soft px-4 py-3 text-sm font-semibold text-ink">
        Demo mode: use sample values only. This screen does not connect to M-Pesa, a bank or a card processor.
      </p>
      <p className="mt-2 text-sm text-ink-600">
        {deal.type === 'hire' ?
        'This secures the vehicle and dates. The balance is settled on delivery.' :
        'This holds the vehicle for 72 hours and is credited in full against the price.'}
      </p>

      <p className="mt-6 rounded-xl bg-ink px-5 py-4 text-bone">
        <span className="text-xs uppercase tracking-[0.18em] text-amber-bright">Amount due now</span>
        <span className="mt-1 block font-display text-4xl tracking-tight">
          {formatKES(outstanding)}
        </span>
      </p>

      <fieldset className="mt-7">
        <legend className="mb-3 text-sm font-medium text-ink">How would you like to pay?</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {methods.map((option) =>
          <label
            key={option.value}
            className={`flex cursor-pointer flex-col rounded-xl border px-4 py-4 transition-colors duration-150 ease-swift ${
            method === option.value ?
            'border-forest bg-forest-pale' :
            'border-bone-line bg-bone hover:border-ink-600'}`
            }>
            
              <span className="flex items-center gap-2.5">
                <input
                type="radio"
                name="method"
                checked={method === option.value}
                onChange={() => {
                  setMethod(option.value);
                  setStatus('idle');
                }}
                className="h-4 w-4 border-bone-line text-forest focus:ring-forest" />
              
                <option.icon className="h-4 w-4 text-ink" aria-hidden="true" />
                <span className="text-sm font-semibold text-ink">{option.label}</span>
              </span>
              <span className="mt-1.5 pl-7 text-xs text-ink-600">{option.note}</span>
            </label>
          )}
        </div>
      </fieldset>

      <motion.div
        key={method}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="mt-6">
        
        {method === 'mpesa' &&
        <div>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink">M-Pesa number</span>
              <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              inputMode="tel"
              className="h-11 w-full max-w-xs rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none" />
            
            </label>
            <p className="mt-3 text-sm text-ink-600">
              We will push a payment request to this number. Enter your M-Pesa PIN on your phone to
              approve. In this demo, the request is only simulated.
            </p>
          </div>
        }

        {method === 'card' &&
        <div className="grid max-w-md gap-5 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-sm font-medium text-ink">Card number</span>
              <input
              value={cardNumber}
              onChange={(event) =>
              setCardNumber(
                event.target.value.
                replace(/[^\d]/g, '').
                slice(0, 16).
                replace(/(\d{4})(?=\d)/g, '$1 ')
              )
              }
              inputMode="numeric"
              placeholder="4242 4242 4242 4242"
              className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none" />
            
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink">Expiry</span>
              <input
              value={expiry}
              onChange={(event) => setExpiry(event.target.value.slice(0, 5))}
              placeholder="MM/YY"
              className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none" />
            
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink">CVV</span>
              <input
              value={cvv}
              onChange={(event) => setCvv(event.target.value.replace(/[^\d]/g, '').slice(0, 4))}
              inputMode="numeric"
              className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none" />
            
            </label>
            <p className="text-xs text-ink-600 sm:col-span-2">
              3-D Secure verification is requested by your bank. Cards are processed in KES; no
              surcharge is added.
            </p>
          </div>
        }

        {method === 'bank' &&
        <dl className="max-w-md divide-y divide-bone-line rounded-xl border border-bone-line bg-white px-5">
            {[
          { label: 'Bank', value: 'Demo bank details' },
          { label: 'Account name', value: 'Not connected' },
          { label: 'Account number', value: 'Demo only' },
          { label: 'Reference', value: deal.ref }].
          map((row) =>
          <div key={row.label} className="flex justify-between gap-4 py-3 text-sm">
                <dt className="text-ink-600">{row.label}</dt>
                <dd className="text-right font-medium text-ink">{row.value}</dd>
              </div>
          )}
          </dl>
        }
      </motion.div>

      {error &&
      <p className="mt-5 text-sm font-medium text-amber" role="alert">
          {error}
        </p>
      }

      <button
        type="button"
        onClick={pay}
        disabled={status === 'pending'}
        className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-forest px-8 text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-forest-light disabled:opacity-70">
        
        {status === 'pending' &&
        <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />
        }
        {status === 'pending' ?
        method === 'mpesa' ?
        'Waiting for your M-Pesa PIN…' :
        'Confirming payment…' :
        method === 'bank' ?
        'I have sent the transfer' :
        `Simulate ${formatKES(outstanding)} payment`}
      </button>

      {status === 'pending' &&
      <p className="mt-3 text-sm text-ink-600" role="status">
          {method === 'mpesa' ?
        `Check ${phone} for the prompt. This page updates by itself.` :
        'Do not close this page — we are confirming with the bank.'}
        </p>
      }
    </div>);

}
