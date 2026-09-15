import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2Icon,
  CheckIcon,
  ClockIcon,
  ArrowLeftIcon,
  LockIcon,
  MessageCircleIcon,
  PhoneIcon } from
'lucide-react';
import { useDeals } from '../contexts/DealsContext';
import { getVehicleBySlug } from '../data/vehicles';
import { company } from '../data/site';
import { DetailsStep } from '../components/checkout/DetailsStep';
import { AgreementStep } from '../components/checkout/AgreementStep';
import { PaymentStep } from '../components/checkout/PaymentStep';
import { formatKES } from '../utils/format';
import type { CustomerRecord, PaymentMethod } from '../types/deal';

const stepLabels = ['Your details', 'Sign the agreement', 'Pay the deposit'];

export function Checkout() {
  const { token } = useParams();
  const { getDealByToken, saveCustomer, signAgreement, recordPayment } = useDeals();
  const deal = token ? getDealByToken(token) : undefined;

  const [step, setStep] = useState(() => {
    if (!deal) return 0;
    if (deal.paymentStatus === 'paid' || deal.paymentStatus === 'partial') return 3;
    if (deal.signedAt) return 2;
    if (deal.customer.idNumber) return 1;
    return 0;
  });
  const [customer, setCustomer] = useState<CustomerRecord>(
    deal?.customer ?? {
      name: '',
      phone: '',
      email: '',
      idNumber: '',
      kraPin: '',
      address: '',
      licenceNumber: '',
      nextOfKin: ''
    }
  );
  const [signatureName, setSignatureName] = useState(deal?.signatureName ?? '');
  const [agreed, setAgreed] = useState(Boolean(deal?.signedAt));
  const [hasSignature, setHasSignature] = useState(Boolean(deal?.signedAt));
  const [error, setError] = useState('');
  const [paidMethod, setPaidMethod] = useState<PaymentMethod | null>(deal?.paymentMethod ?? null);

  if (!deal) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-bone px-5">
        <div className="max-w-md text-center">
          <h1 className="font-display text-4xl tracking-tight text-ink">This link has expired</h1>
          <p className="mt-4 text-base text-ink-600">
            Payment links stay live for 72 hours. Call {company.phone} or reply on WhatsApp and we
            will send you a fresh one in a minute.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-bone">
            
            Back to Mugah Logistics
          </Link>
        </div>
      </div>);

  }

  const vehicle = getVehicleBySlug(deal.vehicleSlug);
  const outstanding = Math.max(deal.depositDue - deal.amountPaid, 0);

  const handleCustomerChange = (field: keyof CustomerRecord, value: string) => {
    setCustomer((current) => ({ ...current, [field]: value }));
  };

  const submitDetails = () => {
    if (!customer.name.trim() || customer.phone.trim().length < 9 || !customer.idNumber.trim()) {
      setError('We need your name, phone number and ID or passport number to continue.');
      return;
    }
    setError('');
    saveCustomer(deal.token, customer);
    setSignatureName((current) => current || customer.name);
    setStep(1);
  };

  const submitSignature = () => {
    if (!signatureName.trim() || !hasSignature || !agreed) {
      setError('Type your name, draw your signature and tick the agreement box.');
      return;
    }
    setError('');
    signAgreement(deal.token, signatureName.trim());
    setStep(2);
  };

  const handlePaid = (method: PaymentMethod, amount: number) => {
    recordPayment(deal.token, method, amount);
    setPaidMethod(method);
    setStep(3);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-bone">
      <header className="border-b border-bone-line bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-forest">
              <span className="font-display text-base leading-none text-amber-soft">M</span>
            </span>
            <span className="font-display text-lg tracking-tight text-ink">Mugah Logistics</span>
          </Link>
          <span className="ml-auto hidden items-center gap-1.5 text-xs font-medium text-forest sm:flex">
            <LockIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Secure link · {deal.ref}
          </span>
          <a
            href={`tel:${company.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-bone-line px-3 py-2 text-xs font-semibold text-ink">
            
            <PhoneIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Need help?
          </a>
        </div>
      </header>

      <div className="bg-amber-soft px-5 py-2 text-center text-xs font-semibold text-ink">
        Product demo only — no real payment is processed and submitted details are not stored.
      </div>

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 lg:px-8 lg:py-14">
        {step === 3 ?
        <div className="mx-auto max-w-2xl text-center" aria-live="polite">
            <CheckCircle2Icon className="mx-auto h-12 w-12 text-forest" aria-hidden="true" />
            <h1 className="mt-6 font-display text-4xl leading-tight tracking-tight text-ink lg:text-5xl">
              Demo complete for {deal.vehicleLabel}.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink-600">
              A simulated {paidMethod === 'mpesa' ? 'M-Pesa' : paidMethod === 'card' ? 'card' : 'bank transfer'} payment was recorded for this preview. No money moved and no agreement or receipt was generated.
            </p>

            <dl className="mt-10 divide-y divide-bone-line rounded-2xl border border-bone-line bg-white px-6 text-left">
              {[
            { label: 'Reference', value: deal.ref },
            { label: 'Vehicle', value: deal.vehicleLabel },
            { label: 'Signed by', value: deal.signatureName ?? signatureName },
            { label: 'Paid', value: formatKES(deal.amountPaid) },
            {
              label: 'Balance',
              value:
              deal.totalAmount - deal.amountPaid > 0 ?
              `${formatKES(deal.totalAmount - deal.amountPaid)} on delivery` :
              'Settled in full'
            }].
            map((row) =>
            <div key={row.label} className="flex justify-between gap-4 py-4 text-sm">
                  <dt className="text-ink-600">{row.label}</dt>
                  <dd className="text-right font-medium text-ink">{row.value}</dd>
                </div>
            )}
            </dl>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-forest">
              
                <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                Return to website
              </Link>
              <a
              href={`https://wa.me/${company.whatsapp.replace(/[^\d]/g, '')}`}
              className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors duration-150 ease-swift hover:bg-bone-dim">
              
                <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
                Arrange collection
              </a>
            </div>

            <p className="mt-8 flex items-center justify-center gap-2 text-sm text-ink-600">
              <ClockIcon className="h-4 w-4" aria-hidden="true" />
              {deal.owner} will call you within the hour to confirm timing.
            </p>
          </div> :

        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
            <div>
              <p className="text-xs font-medium text-ink-600">
                {deal.ref} · prepared for you by {deal.owner}
              </p>
              <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight text-ink lg:text-5xl">
                {deal.type === 'hire' ? 'Confirm your hire' : 'Reserve your vehicle'}
              </h1>

              <ol className="mt-8 flex flex-wrap gap-x-7 gap-y-3 border-b border-bone-line pb-5">
                {stepLabels.map((label, index) =>
              <li key={label} className="flex items-center gap-2.5">
                    <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                  index < step ?
                  'bg-forest text-bone' :
                  index === step ?
                  'bg-ink text-bone' :
                  'bg-bone-dim text-ink-600'}`
                  }
                  aria-hidden="true">
                  
                      {index < step ? <CheckIcon className="h-3.5 w-3.5" /> : index + 1}
                    </span>
                    <span
                  className={`text-sm font-medium ${index === step ? 'text-ink' : 'text-ink-600'}`}>
                  
                      {label}
                    </span>
                  </li>
              )}
              </ol>

              <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
              className="pt-8">
              
                {step === 0 &&
              <DetailsStep customer={customer} onChange={handleCustomerChange} error={error} />
              }
                {step === 1 &&
              <AgreementStep
                deal={deal}
                signatureName={signatureName}
                onSignatureNameChange={setSignatureName}
                agreed={agreed}
                onAgreedChange={setAgreed}
                onSignatureChange={setHasSignature}
                error={error} />

              }
                {step === 2 && <PaymentStep deal={deal} onPaid={handlePaid} />}
              </motion.div>

              {step < 2 &&
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-bone-line pt-6">
                  <button
                type="button"
                onClick={() => {
                  setError('');
                  setStep((value) => Math.max(value - 1, 0));
                }}
                disabled={step === 0}
                className="text-sm font-semibold text-ink-600 transition-colors duration-150 ease-swift hover:text-ink disabled:opacity-40">
                
                    Back
                  </button>
                  <button
                type="button"
                onClick={step === 0 ? submitDetails : submitSignature}
                className="rounded-full bg-ink px-7 py-3 text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-forest">
                
                    {step === 0 ? 'Save and continue' : 'Sign agreement'}
                  </button>
                </div>
            }
            </div>

            <aside className="lg:sticky lg:top-8 lg:self-start">
              <div className="overflow-hidden rounded-2xl border border-bone-line bg-white">
                {vehicle &&
              <img
                src={vehicle.image}
                alt={deal.vehicleLabel}
                className="aspect-[4/3] w-full object-cover" />

              }
                <div className="p-6">
                  <h2 className="font-display text-2xl leading-tight tracking-tight text-ink">
                    {deal.vehicleLabel}
                  </h2>
                  {deal.hire ?
                <p className="mt-2 text-sm text-ink-600">
                      {deal.hire.days} days · {deal.hire.pickup} ·{' '}
                      {deal.hire.withDriver ? 'with a driver' : 'self-drive'}
                    </p> :

                <p className="mt-2 text-sm text-ink-600">
                      {vehicle?.condition} · {vehicle?.yard}
                    </p>
                }

                  <dl className="mt-5 divide-y divide-bone-line border-y border-bone-line">
                    <div className="flex justify-between gap-4 py-3 text-sm">
                      <dt className="text-ink-600">
                        {deal.type === 'hire' ? 'Hire total' : 'Vehicle price'}
                      </dt>
                      <dd className="font-medium text-ink">{formatKES(deal.totalAmount)}</dd>
                    </div>
                    <div className="flex justify-between gap-4 py-3 text-sm">
                      <dt className="text-ink-600">Due now</dt>
                      <dd className="font-semibold text-forest">{formatKES(outstanding)}</dd>
                    </div>
                    <div className="flex justify-between gap-4 py-3 text-sm">
                      <dt className="text-ink-600">Balance later</dt>
                      <dd className="font-medium text-ink">
                        {formatKES(Math.max(deal.totalAmount - deal.depositDue, 0))}
                      </dd>
                    </div>
                  </dl>

                  <ul className="mt-5 space-y-2 text-xs text-ink-600">
                    {[
                  'Deposit refundable for 24 hours',
                  deal.type === 'hire' ?
                  'Comprehensive insurance included' :
                  '121-point inspection report attached',
                  'Nothing is charged until you reach the payment step'].
                  map((item) =>
                  <li key={item} className="flex items-start gap-2">
                        <CheckIcon
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest"
                      aria-hidden="true" />
                    
                        {item}
                      </li>
                  )}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        }
      </main>

      <footer className="border-t border-bone-line bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-ink-600 lg:px-8">
          <p>© {new Date().getFullYear()} Mugah Logistics Ltd · NTSA registered dealer</p>
          <p>Demo checkout · no real payments are processed</p>
        </div>
      </footer>
    </div>);

}
