import React, { useState } from 'react';
import {
  CheckCircle2Icon,
  ChevronDownIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon } from
'lucide-react';
import { company, faqs } from '../data/site';
import { emailUrl, whatsappUrl } from '../utils/contact';

const enquiryTypes = [
'Buying a car',
'Hiring a car',
'Selling my car to you',
'Corporate fleet contract',
'Import on order'];


export function Contact() {
  const [type, setType] = useState(enquiryTypes[0]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const preparedMessage = [
    `Hello Mugah Logistics, I am enquiring about ${type.toLowerCase()}.`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    email.trim() ? `Email: ${email.trim()}` : '',
    budget.trim() ? `Budget: ${budget.trim()}` : '',
    `Message: ${message.trim()}`
  ].filter(Boolean).join('\n');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || phone.trim().length < 9 || !message.trim()) {
      setError('Please add your name, a phone number and a short note so we can help properly.');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <>
      <section className="mx-auto max-w-shell px-5 py-14 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <h1 className="font-display text-5xl leading-[1.02] tracking-tightest text-ink lg:text-7xl">
              Come and see the cars.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-600 lg:text-lg">
              Walk into our Roysambu location during opening hours — no appointment needed, and you are welcome
              to bring your own mechanic. Or send a note and we will call you back.
            </p>

            <div className="mt-12 max-w-xl">
              <div className="border-t-2 border-ink pt-5">
                <h2 className="text-lg font-semibold text-ink">Roysambu showroom &amp; yard</h2>
                <p className="mt-2 flex gap-2.5 text-sm leading-relaxed text-ink-600">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-forest-mid" aria-hidden="true" />
                  {company.showroom}
                </p>
                <p className="mt-2 text-sm text-ink-600">
                  Vehicle sales, hire collection, inspections, financing support and test drives.
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.showroom)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-sm font-semibold text-forest underline underline-offset-4">
                  Open in Maps
                </a>
              </div>
            </div>

            <div className="mt-10 grid gap-6 border-t border-bone-line pt-8 sm:grid-cols-2">
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-forest-mid" aria-hidden="true" />
                  <a
                    href={`tel:${company.phone.replace(/\s/g, '')}`}
                    className="font-semibold text-ink hover:text-forest">
                    
                    {company.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MessageCircleIcon
                    className="mt-0.5 h-4 w-4 shrink-0 text-forest-mid"
                    aria-hidden="true" />
                  
                  <a
                    href={`https://wa.me/${company.whatsapp.replace(/[^\d]/g, '')}`}
                    className="font-semibold text-ink hover:text-forest">
                    
                    WhatsApp us
                  </a>
                </li>
                <li className="flex gap-3">
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-forest-mid" aria-hidden="true" />
                  <a
                    href={`mailto:${company.email}`}
                    className="font-semibold text-ink hover:text-forest">
                    
                    {company.email}
                  </a>
                </li>
              </ul>
              <ul className="space-y-2 text-sm text-ink-600">
                {company.hours.map((entry) =>
                <li key={entry.days} className="flex justify-between gap-4">
                    <span className="flex gap-2.5">
                      <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-forest-mid" aria-hidden="true" />
                      {entry.days}
                    </span>
                    <span className="text-ink">{entry.time}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-bone-line bg-white p-6 lg:p-8">
            {sent ?
            <div aria-live="polite">
                <CheckCircle2Icon className="h-9 w-9 text-forest" aria-hidden="true" />
                <h2 className="mt-4 font-display text-3xl tracking-tight text-ink">Your message is ready</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  Choose WhatsApp or email to send it. Nothing leaves this website until you confirm in the app that opens.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={whatsappUrl(preparedMessage)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-bone">
                    <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
                    Send on WhatsApp
                  </a>
                  <a
                    href={emailUrl(`Website enquiry: ${type}`, preparedMessage)}
                    className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 text-sm font-semibold text-ink">
                    <MailIcon className="h-4 w-4" aria-hidden="true" />
                    Send by email
                  </a>
                </div>
                <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-5 text-sm font-semibold text-forest underline underline-offset-4">
                
                  Edit message
                </button>
              </div> :

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <h2 className="font-display text-3xl tracking-tight text-ink">Send us a note</h2>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-ink">
                    What is this about?
                  </span>
                  <select
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none">
                  
                    {enquiryTypes.map((option) =>
                  <option key={option}>{option}</option>
                  )}
                  </select>
                </label>
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
                <div className="grid gap-5 sm:grid-cols-2">
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
                      Budget <span className="font-normal text-ink-600">(optional)</span>
                    </span>
                    <input
                    value={budget}
                    onChange={(event) => setBudget(event.target.value)}
                    placeholder="e.g. KES 3M, or 20% deposit"
                    className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none" />
                  
                  </label>
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-ink">Your message</span>
                  <textarea
                  value={message}
                  required
                  onChange={(event) => setMessage(event.target.value)}
                  rows={4}
                  placeholder="Tell us the model, dates or spec you have in mind."
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
                
                  Prepare message
                </button>
                <p className="text-xs text-ink-600">
                  You will review and send the message in WhatsApp or your email app.
                </p>
              </form>
            }
          </div>
        </div>
      </section>

      <section className="border-t border-bone-line bg-white">
        <div className="mx-auto max-w-shell px-5 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <h2 className="font-display text-4xl leading-tight tracking-tight text-ink lg:text-5xl">
              Questions we get asked most
            </h2>
            <dl className="border-t border-bone-line">
              {faqs.map((faq, index) => {
                const open = openFaq === index;
                return (
                  <div key={faq.q} className="border-b border-bone-line">
                    <dt>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? null : index)}
                        aria-expanded={open}
                        className="flex w-full items-center justify-between gap-6 py-5 text-left">
                        
                        <span className="text-base font-semibold text-ink">{faq.q}</span>
                        <ChevronDownIcon
                          className={`h-5 w-5 shrink-0 text-ink-600 transition-transform duration-200 ease-swift ${
                          open ? 'rotate-180' : ''}`
                          }
                          aria-hidden="true" />
                        
                      </button>
                    </dt>
                    {open &&
                    <dd className="max-w-2xl pb-6 text-sm leading-relaxed text-ink-600">
                        {faq.a}
                      </dd>
                    }
                  </div>);

              })}
            </dl>
          </div>
        </div>
      </section>
    </>);

}
