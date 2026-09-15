import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CheckIcon,
  ClipboardCheckIcon,
  PhoneIcon,
  MessageCircleIcon,
  ShieldCheckIcon,
  WrenchIcon } from
'lucide-react';
import { useMode } from '../contexts/ModeContext';
import { useDeals } from '../contexts/DealsContext';
import { getVehicleBySlug, vehicles } from '../data/vehicles';
import { company } from '../data/site';
import { formatKES, formatMileage } from '../utils/format';
import { VehicleCard } from '../components/VehicleCard';
import { siteConfig } from '../config';
import { whatsappUrl } from '../utils/contact';

export function VehicleDetail() {
  const { slug } = useParams();
  const { mode } = useMode();
  const { deals } = useDeals();
  const vehicle = slug ? getVehicleBySlug(slug) : undefined;
  const openDeal =
  deals.find((deal) => deal.vehicleSlug === slug && deal.paymentStatus !== 'paid') ?? deals[0];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  if (!vehicle) {
    return (
      <div className="mx-auto max-w-shell px-5 py-24 text-center lg:px-8">
        <h1 className="font-display text-4xl tracking-tight text-ink">We no longer list that one</h1>
        <p className="mx-auto mt-4 max-w-md text-base text-ink-600">
          It may have sold. Have a look at what is currently on the floor, or tell us the spec you
          are after and we will source it.
        </p>
        <Link
          to="/inventory"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-bone">
          
          Back to inventory
        </Link>
      </div>);

  }

  const hireOnly = !vehicle.availability.includes('buy');
  const showHire = mode === 'hire' || hireOnly;
  const enquiryText = [
    `Hello Mugah Logistics, I would like to ${showHire ? 'hire' : 'view'} the ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.id.toUpperCase()}).`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    message.trim() ? `Notes: ${message.trim()}` : ''
  ].filter(Boolean).join('\n');
  const similar = vehicles.
  filter(
    (item) =>
    item.id !== vehicle.id &&
    item.availability.includes(mode) && (
    item.bodyType === vehicle.bodyType || item.make === vehicle.make)
  ).
  slice(0, 3);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || phone.trim().length < 9) {
      setError('Please add your name and a phone number we can reach you on.');
      return;
    }
    setError('');
    setSent(true);
  };

  const specs = [
  { label: 'Year', value: String(vehicle.year) },
  { label: 'Body', value: vehicle.bodyType },
  { label: 'Engine', value: vehicle.engine },
  { label: 'Transmission', value: vehicle.transmission },
  { label: 'Drive', value: vehicle.drive },
  { label: 'Fuel', value: vehicle.fuel },
  { label: 'Mileage', value: formatMileage(vehicle.mileageKm) },
  { label: 'Seats', value: `${vehicle.seats}` },
  { label: 'Colour', value: vehicle.colour },
  { label: 'Condition', value: vehicle.condition },
  { label: 'Located at', value: vehicle.yard },
  { label: 'Reference', value: vehicle.id.toUpperCase() }];


  return (
    <div className="mx-auto max-w-shell px-5 py-8 lg:px-8 lg:py-12">
      <Link
        to={mode === 'buy' ? '/inventory' : '/hire'}
        className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 transition-colors duration-150 ease-swift hover:text-ink">
        
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
        {mode === 'buy' ? 'All inventory' : 'All hire vehicles'}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <div>
          <div className="overflow-hidden rounded-2xl border border-bone-line bg-white">
            <img
              src={vehicle.image}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`}
              className="aspect-[4/3] w-full object-cover" />
            
          </div>

          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-600">
            {vehicle.condition} · {vehicle.yard}
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight text-ink lg:text-6xl">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
          <p className="mt-2 text-lg text-ink-600">{vehicle.trim}</p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-600">{vehicle.blurb}</p>

          <h2 className="mt-12 font-display text-3xl tracking-tight text-ink">Specification</h2>
          <dl className="mt-5 grid grid-cols-2 gap-y-5 border-t border-bone-line pt-6 sm:grid-cols-3">
            {specs.map((spec) =>
            <div key={spec.label}>
                <dt className="text-xs uppercase tracking-[0.14em] text-ink-600">{spec.label}</dt>
                <dd className="mt-1 text-sm font-medium text-ink">{spec.value}</dd>
              </div>
            )}
          </dl>

          <h2 className="mt-12 font-display text-3xl tracking-tight text-ink">
            {showHire ? 'Included with the hire' : 'Fitted & confirmed'}
          </h2>
          <ul className="mt-5 grid gap-3 border-t border-bone-line pt-6 sm:grid-cols-2">
            {vehicle.features.map((feature) =>
            <li key={feature} className="flex items-start gap-2.5 text-sm text-ink">
                <CheckIcon
                className="mt-0.5 h-4 w-4 shrink-0 text-forest-mid"
                aria-hidden="true" />
              
                {feature}
              </li>
            )}
          </ul>

          <div className="mt-12 rounded-2xl bg-forest px-6 py-8 text-bone lg:px-10">
            <h2 className="font-display text-3xl tracking-tight">
              {showHire ? 'Before it leaves the yard' : 'Our 121-point inspection'}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {[
              {
                icon: WrenchIcon,
                title: 'Mechanical',
                body: showHire ?
                'Serviced every 5,000 km with tyre, brake and fluid checks logged before each hire.' :
                'Engine compression, gearbox, suspension and undercarriage checked and documented.'
              },
              {
                icon: ClipboardCheckIcon,
                title: 'Paperwork',
                body: showHire ?
                'Comprehensive insurance certificate and, where relevant, a valid PSV licence on board.' :
                'Logbook, import entry and duty records verified against NTSA before listing.'
              },
              {
                icon: ShieldCheckIcon,
                title: 'Aftercare',
                body: showHire ?
                '24-hour recovery countrywide and a replacement unit if yours is off the road.' :
                'Free first service at 1,000 km and a call from Peter to see how it is driving.'
              }].
              map((item) =>
              <div key={item.title}>
                  <item.icon className="h-5 w-5 text-amber-bright" aria-hidden="true" />
                  <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-bone/70">{item.body}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-bone-line bg-white p-6 lg:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-600">
              {showHire ? 'Daily hire rate' : 'Asking price'}
            </p>
            <p className="mt-2 font-display text-4xl tracking-tight text-ink">
              {showHire ?
              vehicle.hireRate ?
              formatKES(vehicle.hireRate) :
              'Not for hire' :
              vehicle.salePrice ?
              formatKES(vehicle.salePrice) :
              'Not for sale'}
            </p>
            <p className="mt-2 text-sm text-ink-600">
              {showHire ?
              'Insurance and 150 km a day included. Weekly hires save 15%.' :
              'Negotiable on cash. Trade-ins valued the same day.'}
            </p>

            {!hireOnly && !showHire && vehicle.hireRate &&
            <p className="mt-4 rounded-lg bg-bone-dim px-4 py-3 text-sm text-ink">
                Also on the hire fleet at{' '}
                <span className="font-semibold">{formatKES(vehicle.hireRate)}</span> per day — try it
                for a weekend first.
              </p>
            }

            {siteConfig.demoFeaturesEnabled ? <div className="mt-5 rounded-xl bg-ink px-4 py-4 text-bone">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-bright">
                Or do it all online
              </p>
              <p className="mt-2 text-sm leading-relaxed text-bone/70">
                Fill your details, sign the {showHire ? 'hire' : 'sale'} agreement and pay the deposit
                by M-Pesa from your phone. Takes about five minutes.
              </p>
              <Link
                to={`/checkout/${openDeal.token}`}
                className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-amber-bright py-3 text-sm font-semibold text-ink transition-colors duration-150 ease-swift hover:bg-amber">
                
                <ShieldCheckIcon className="h-4 w-4" aria-hidden="true" />
                {showHire ? 'Reserve online' : 'Reserve with a deposit'}
              </Link>
            </div> : <div className="mt-5 rounded-xl bg-ink px-4 py-4 text-bone">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-bright">
                Reserve and choose how to pay
              </p>
              <p className="mt-2 text-sm leading-relaxed text-bone/70">
                We confirm availability, then send a verified M-Pesa, card or bank-transfer payment link for this vehicle.
              </p>
              <a
                href={whatsappUrl(`Hello Mugah Logistics, is the ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.id.toUpperCase()}) available? Please send me the payment options.`)}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-amber-bright py-3 text-sm font-semibold text-ink transition-colors duration-150 ease-swift hover:bg-amber">
                <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
                Request payment link
              </a>
              <Link to="/payments" className="mt-3 flex justify-center text-xs font-semibold text-bone/70 underline underline-offset-4 hover:text-bone">
                Compare payment options
              </Link>
            </div>}

            {sent ?
            <div className="mt-6 rounded-lg border border-forest/20 bg-forest-pale px-4 py-5">
                <h2 className="font-semibold text-forest">Your enquiry is ready</h2>
                <p className="mt-2 text-sm text-ink-600">
                  Send the prepared message on WhatsApp so our team can confirm availability and call you back on {phone}.
                </p>
                <a
                  href={whatsappUrl(enquiryText)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-bone">
                  <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
                  Send via WhatsApp
                </a>
                <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-4 text-sm font-semibold text-forest underline underline-offset-4">
                
                  Edit enquiry
                </button>
              </div> :

            <form onSubmit={handleSubmit} className="mt-6 space-y-3" noValidate>
                <h2 className="text-sm font-semibold text-ink">
                  {showHire ? 'Reserve this vehicle' : 'Book a test drive'}
                </h2>
                <label className="block">
                  <span className="sr-only">Your name</span>
                  <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none" />
                
                </label>
                <label className="block">
                  <span className="sr-only">Phone number</span>
                  <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Phone number"
                  inputMode="tel"
                  className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none" />
                
                </label>
                <label className="block">
                  <span className="sr-only">Message</span>
                  <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={3}
                  placeholder={
                  showHire ?
                  'Dates, pickup point, driver or self-drive…' :
                  'When would you like to view it?'
                  }
                  className="w-full rounded-lg border border-bone-line bg-bone px-3 py-2.5 text-sm text-ink focus:border-forest focus:outline-none" />
                
                </label>
                {error &&
              <p className="text-sm font-medium text-amber" role="alert">
                    {error}
                  </p>
              }
                <button
                type="submit"
                className="h-11 w-full rounded-lg bg-ink text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-forest">
                
                  {showHire ? 'Request this hire' : 'Request a test drive'}
                </button>
              </form>
            }

            <a
              href={`tel:${company.phone.replace(/\s/g, '')}`}
              className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-bone-line py-3 text-sm font-semibold text-ink transition-colors duration-150 ease-swift hover:border-ink">
              
              <PhoneIcon className="h-4 w-4" aria-hidden="true" />
              {company.phone}
            </a>
          </div>
        </aside>
      </div>

      {similar.length > 0 &&
      <section className="mt-20">
          <h2 className="font-display text-3xl tracking-tight text-ink lg:text-4xl">
            Similar vehicles
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((item) =>
          <VehicleCard key={item.id} vehicle={item} mode={mode} />
          )}
          </div>
        </section>
      }
    </div>);

}
