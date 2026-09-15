import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2Icon, CheckIcon, MailIcon, MessageCircleIcon } from 'lucide-react';
import { vehicles } from '../../data/vehicles';
import { dateInputValue, daysBetween, formatKES, nextDateInputValue } from '../../utils/format';
import { emailUrl, whatsappUrl } from '../../utils/contact';

const pickups = [
{ value: 'JKIA — Airport', fee: 2000 },
{ value: 'Wilson Airport', fee: 1500 },
{ value: 'Roysambu — Thika Road', fee: 0 },
{ value: 'Your hotel or office', fee: 1000 }];


const DRIVER_DAY_RATE = 3500;

const stepLabels = ['Trip details', 'Choose a vehicle', 'Your details'];

export function BookingFlow() {
  const [params] = useSearchParams();
  const hireFleet = vehicles.filter((vehicle) => vehicle.availability.includes('hire'));

  const [step, setStep] = useState(0);
  const [pickup, setPickup] = useState(
    pickups.find((option) => option.value === params.get('pickup'))?.value ?? pickups[0].value
  );
  const [from, setFrom] = useState(params.get('from') || dateInputValue());
  const [to, setTo] = useState(params.get('to') || nextDateInputValue(params.get('from') || dateInputValue()));
  const [withDriver, setWithDriver] = useState(false);
  const [vehicleId, setVehicleId] = useState(hireFleet[0].id);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const days = daysBetween(from, to);
  const vehicle = hireFleet.find((item) => item.id === vehicleId) ?? hireFleet[0];
  const pickupFee = pickups.find((option) => option.value === pickup)?.fee ?? 0;

  const quote = useMemo(() => {
    const chargedDays = Math.max(days, 1);
    const base = (vehicle.hireRate ?? 0) * chargedDays;
    const driver = withDriver ? DRIVER_DAY_RATE * chargedDays : 0;
    const discountRate = chargedDays >= 30 ? 0.3 : chargedDays >= 7 ? 0.15 : 0;
    const discount = Math.round((base + driver) * discountRate);
    const total = base + driver + pickupFee - discount;
    return { chargedDays, base, driver, discount, discountRate, total };
  }, [days, vehicle, withDriver, pickupFee]);
  const bookingMessage = [
    'Hello Mugah Logistics, I would like to request a hire booking.',
    `Vehicle: ${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    `Dates: ${from} to ${to} (${quote.chargedDays} ${quote.chargedDays === 1 ? 'day' : 'days'})`,
    `Pickup: ${pickup}`,
    `Driving: ${withDriver ? 'With a driver' : 'Self-drive'}`,
    `Estimated total: ${formatKES(quote.total)}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    email.trim() ? `Email: ${email.trim()}` : '',
    notes.trim() ? `Notes: ${notes.trim()}` : ''
  ].filter(Boolean).join('\n');

  const goNext = () => {
    if (step === 0) {
      if (!from || !to || from < dateInputValue() || days < 1) {
        setError('Choose a pickup date and a return date at least one day apart.');
        return;
      }
    }
    setError('');
    setStep((value) => Math.min(value + 1, 2));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || phone.trim().length < 9) {
      setError('We need your name and a phone number to confirm the booking.');
      return;
    }
    setError('');
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <section
        id="booking"
        className="mx-auto max-w-shell px-5 pb-20 lg:px-8 lg:pb-28"
        aria-live="polite">
        
        <div className="rounded-2xl border border-forest/20 bg-forest-pale px-6 py-12 text-center lg:px-16 lg:py-16">
          <CheckCircle2Icon className="mx-auto h-10 w-10 text-forest" aria-hidden="true" />
          <h2 className="mt-5 font-display text-4xl leading-tight tracking-tight text-forest lg:text-5xl">
            Your booking request is ready
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-600">
            Review and send the prepared request through WhatsApp or email. The team will then confirm the{' '}
            {vehicle.make} {vehicle.model}, your dates and the estimated total of{' '}
            <span className="font-semibold text-ink">{formatKES(quote.total)}</span>.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink-600">
            Do not send payment details or your M-Pesa PIN in a message. Identity and licence checks happen only after availability is confirmed.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappUrl(bookingMessage)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-bone transition-colors hover:bg-forest-light">
              <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
              Send on WhatsApp
            </a>
            <a
              href={emailUrl('Car hire request', bookingMessage)}
              className="inline-flex items-center gap-2 rounded-full border border-forest px-6 py-3 text-sm font-semibold text-forest">
              <MailIcon className="h-4 w-4" aria-hidden="true" />
              Send by email
            </a>
          </div>
          <button
            type="button"
            onClick={() => {
              setConfirmed(false);
              setStep(0);
            }}
            className="mt-5 inline-flex items-center text-sm font-semibold text-forest underline underline-offset-4">
            
            Edit booking
          </button>
        </div>
      </section>);

  }

  return (
    <section id="booking" className="mx-auto max-w-shell px-5 pb-20 lg:px-8 lg:pb-28">
      <div className="max-w-2xl">
        <h2 className="font-display text-4xl leading-tight tracking-tight text-ink lg:text-5xl">
          Book a hire in three steps
        </h2>
        <p className="mt-3 text-base text-ink-600">
          Nothing is charged here. We confirm availability by phone, then deliver the car fuelled and
          checked.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
        <div className="rounded-2xl border border-bone-line bg-white p-6 lg:p-8">
          <ol className="flex flex-wrap gap-x-8 gap-y-3 border-b border-bone-line pb-5">
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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="pt-6">
            
            {step === 0 &&
            <div className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-ink">Pickup point</span>
                  <select
                  value={pickup}
                  onChange={(event) => setPickup(event.target.value)}
                  className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none">
                  
                    {pickups.map((option) =>
                  <option key={option.value} value={option.value}>
                        {option.value}
                        {option.fee > 0 ? ` (+${formatKES(option.fee)} delivery)` : ' (free)'}
                      </option>
                  )}
                  </select>
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-ink">Pickup date</span>
                    <input
                    type="date"
                    value={from}
                    min={dateInputValue()}
                    required
                    onChange={(event) => {
                      const nextFrom = event.target.value;
                      setFrom(nextFrom);
                      if (!to || to <= nextFrom) setTo(nextDateInputValue(nextFrom));
                    }}
                    className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none" />
                  
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-ink">Return date</span>
                    <input
                    type="date"
                    value={to}
                    min={nextDateInputValue(from)}
                    required
                    onChange={(event) => setTo(event.target.value)}
                    className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none" />
                  
                  </label>
                </div>

                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-ink">Who is driving?</legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                  { value: false, title: 'Self-drive', note: 'Licence held 2+ years' },
                  {
                    value: true,
                    title: 'With a driver',
                    note: `+${formatKES(DRIVER_DAY_RATE)} per day`
                  }].
                  map((option) =>
                  <label
                    key={option.title}
                    className={`flex cursor-pointer flex-col rounded-lg border px-4 py-3 transition-colors duration-150 ease-swift ${
                    withDriver === option.value ?
                    'border-forest bg-forest-pale' :
                    'border-bone-line bg-bone hover:border-ink-600'}`
                    }>
                    
                        <span className="flex items-center gap-2.5">
                          <input
                        type="radio"
                        name="driver"
                        checked={withDriver === option.value}
                        onChange={() => setWithDriver(option.value)}
                        className="h-4 w-4 border-bone-line text-forest focus:ring-forest" />
                      
                          <span className="text-sm font-semibold text-ink">{option.title}</span>
                        </span>
                        <span className="mt-1 pl-7 text-xs text-ink-600">{option.note}</span>
                      </label>
                  )}
                  </div>
                </fieldset>
              </div>
            }

            {step === 1 &&
            <fieldset>
                <legend className="mb-4 text-sm font-medium text-ink">
                  Choose from {hireFleet.length} vehicles in the hire fleet
                </legend>
                <div className="space-y-3">
                  {hireFleet.map((item) =>
                <label
                  key={item.id}
                  className={`flex cursor-pointer items-center gap-4 rounded-lg border p-3 transition-colors duration-150 ease-swift ${
                  vehicleId === item.id ?
                  'border-forest bg-forest-pale' :
                  'border-bone-line bg-bone hover:border-ink-600'}`
                  }>
                  
                      <input
                    type="radio"
                    name="vehicle"
                    checked={vehicleId === item.id}
                    onChange={() => setVehicleId(item.id)}
                    className="h-4 w-4 shrink-0 border-bone-line text-forest focus:ring-forest" />
                  
                      <img
                    src={item.image}
                    alt=""
                    className="h-14 w-20 shrink-0 rounded object-cover"
                    loading="lazy" />
                  
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-ink">
                          {item.make} {item.model}
                        </span>
                        <span className="block text-xs text-ink-600">
                          {item.bodyType} · {item.seats} seats · {item.transmission}
                        </span>
                      </span>
                      <span className="shrink-0 text-right text-sm font-semibold text-ink">
                        {formatKES(item.hireRate ?? 0)}
                        <span className="block text-xs font-normal text-ink-600">per day</span>
                      </span>
                    </label>
                )}
                </div>
              </fieldset>
            }

            {step === 2 &&
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-ink">Full name</span>
                    <input
                    value={name}
                    autoComplete="name"
                    required
                    onChange={(event) => setName(event.target.value)}
                    className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none" />
                  
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-ink">Phone</span>
                    <input
                    value={phone}
                    autoComplete="tel"
                    required
                    onChange={(event) => setPhone(event.target.value)}
                    inputMode="tel"
                    placeholder="+254…"
                    className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none" />
                  
                  </label>
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-ink">
                    Email <span className="font-normal text-ink-600">(optional)</span>
                  </span>
                  <input
                  type="email"
                  value={email}
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none" />
                
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-ink">
                    Anything we should know?
                  </span>
                  <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={3}
                  placeholder="Flight number, child seat, crossing into Tanzania…"
                  className="w-full rounded-lg border border-bone-line bg-bone px-3 py-2.5 text-sm text-ink focus:border-forest focus:outline-none" />
                
                </label>
                {error &&
              <p className="text-sm font-medium text-amber" role="alert">
                    {error}
                  </p>
              }
                <button
                type="submit"
                className="h-12 w-full rounded-lg bg-ink text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-forest">
                
                  Prepare booking request
                </button>
              </form>
            }
          </motion.div>

          {step < 2 &&
          <div className="mt-6 flex items-center justify-between border-t border-bone-line pt-5">
              <button
              type="button"
              onClick={() => setStep((value) => Math.max(value - 1, 0))}
              disabled={step === 0}
              className="text-sm font-semibold text-ink-600 transition-colors duration-150 ease-swift hover:text-ink disabled:opacity-40">
              
                Back
              </button>
              {step === 0 && error &&
            <p className="mr-auto pl-6 text-sm font-medium text-amber" role="alert">
                  {error}
                </p>
            }
              <button
              type="button"
              onClick={goNext}
              className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-forest-light">
              
                Continue
              </button>
            </div>
          }
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl bg-ink p-6 text-bone lg:p-7">
            <h3 className="font-display text-2xl tracking-tight">Your quote</h3>
            <p className="mt-1 text-sm text-bone/60">
              {days > 0 ?
              `${days} ${days === 1 ? 'day' : 'days'} · ${pickup}` :
              'Add your dates to see the total'}
            </p>

            <div className="mt-6 flex items-center gap-3 border-y border-white/10 py-4">
              <img
                src={vehicle.image}
                alt=""
                className="h-12 w-16 rounded object-cover"
                loading="lazy" />
              
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {vehicle.make} {vehicle.model}
                </p>
                <p className="text-xs text-bone/60">
                  {formatKES(vehicle.hireRate ?? 0)} / day · {vehicle.seats} seats
                </p>
              </div>
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-bone/60">
                  Hire × {quote.chargedDays} {quote.chargedDays === 1 ? 'day' : 'days'}
                </dt>
                <dd>{formatKES(quote.base)}</dd>
              </div>
              {quote.driver > 0 &&
              <div className="flex justify-between gap-4">
                  <dt className="text-bone/60">Driver</dt>
                  <dd>{formatKES(quote.driver)}</dd>
                </div>
              }
              <div className="flex justify-between gap-4">
                <dt className="text-bone/60">Delivery</dt>
                <dd>{pickupFee > 0 ? formatKES(pickupFee) : 'Free'}</dd>
              </div>
              {quote.discount > 0 &&
              <div className="flex justify-between gap-4 text-amber-bright">
                  <dt>Long-hire discount ({Math.round(quote.discountRate * 100)}%)</dt>
                  <dd>− {formatKES(quote.discount)}</dd>
                </div>
              }
            </dl>

            <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-white/10 pt-5">
              <span className="text-sm text-bone/60">Estimated total</span>
              <span className="font-display text-3xl tracking-tight text-amber-bright">
                {formatKES(quote.total)}
              </span>
            </div>

            <ul className="mt-6 space-y-2 text-xs text-bone/60">
              {[
              'Comprehensive insurance included',
              '24-hour countrywide recovery',
              'Full tank on collection, like-for-like return'].
              map((item) =>
              <li key={item} className="flex items-start gap-2">
                  <CheckIcon
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-bright"
                  aria-hidden="true" />
                
                  {item}
                </li>
              )}
            </ul>
          </div>
        </aside>
      </div>
    </section>);

}
