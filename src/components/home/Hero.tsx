import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, MapPinIcon, SearchIcon } from 'lucide-react';
import { ModeToggle } from '../ModeToggle';
import { useMode } from '../../contexts/ModeContext';
import { HERO_IMAGE } from '../../data/vehicles';
import { company } from '../../data/site';
import { dateInputValue, nextDateInputValue } from '../../utils/format';

const copy = {
  buy: {
    heading: 'The car you want, with paperwork that holds up.',
    body: 'Inspected, NTSA-verified vehicles from a Nairobi family business. You see the 121-point report before you see the price tag — and we handle the transfer of ownership ourselves.',
    cta: 'Browse the inventory',
    ctaTo: '/inventory'
  },
  hire: {
    heading: 'Keys in your hand, wherever you land.',
    body: 'Self-drive or chauffeured hire across Kenya, delivered to JKIA, your hotel or your office. Comprehensive cover, 24-hour recovery and drivers who actually know the routes.',
    cta: 'See hire rates',
    ctaTo: '/hire'
  }
};

const budgets = [
{ value: '', label: 'Any budget' },
{ value: '2000000', label: 'Under KES 2M' },
{ value: '5000000', label: 'KES 2M – 5M' },
{ value: '12000000', label: 'Up to KES 12M' }];


const bodies = ['Any body type', 'SUV', 'Sedan', 'Hatchback', 'Station Wagon', 'Van'];

const pickups = ['JKIA — Airport', 'Wilson Airport', 'Kilimani showroom', 'Your hotel or office'];

export function Hero() {
  const { mode } = useMode();
  const navigate = useNavigate();
  const active = copy[mode];

  const [budget, setBudget] = useState('');
  const [body, setBody] = useState(bodies[0]);
  const [pickup, setPickup] = useState(pickups[0]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (mode === 'buy') {
      const params = new URLSearchParams();
      if (budget) params.set('budget', budget);
      if (body !== bodies[0]) params.set('body', body);
      navigate(`/inventory${params.toString() ? `?${params.toString()}` : ''}`);
      return;
    }
    const params = new URLSearchParams({ pickup });
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    navigate(`/hire?${params.toString()}`);
  };

  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="A silver Toyota Land Cruiser Prado on an open road outside Nairobi at sunset"
          className="h-full w-full object-cover object-center opacity-60 lg:opacity-100 lg:[clip-path:polygon(42%_0,100%_0,100%_100%,28%_100%)]" />
        
        <div className="absolute inset-0 bg-ink/70 lg:hidden" aria-hidden="true" />
        <div
          className="absolute inset-y-0 left-0 hidden w-[62%] bg-ink lg:block lg:[clip-path:polygon(0_0,100%_0,86%_100%,0_100%)]"
          aria-hidden="true" />
        
      </div>

      <div className="relative mx-auto max-w-shell px-5 pb-14 pt-16 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-xs font-medium text-bone/60">
            <MapPinIcon className="h-3.5 w-3.5 text-amber-bright" aria-hidden="true" />
            Kilimani showroom &amp; Mombasa Road yard, Nairobi
          </p>

          <motion.h1
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="mt-5 font-display text-[2.75rem] leading-[1.02] tracking-tightest text-bone sm:text-6xl lg:text-[4.25rem]">
            
            {active.heading}
          </motion.h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-bone/70 lg:text-lg">
            {active.body}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ModeToggle tone="dark" size="lg" />
            <Link
              to={active.ctaTo}
              className="inline-flex items-center gap-2 text-sm font-semibold text-bone underline decoration-amber-bright decoration-2 underline-offset-8 transition-colors duration-150 ease-swift hover:text-amber-bright">
              
              {active.cta}
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 rounded-xl bg-bone p-4 shadow-xl shadow-black/20 sm:p-5 lg:mt-16 lg:max-w-4xl">
          
          <p className="px-1 pb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-600">
            {mode === 'buy' ? 'Find a car to buy' : 'Check hire availability'}
          </p>
          {mode === 'buy' ?
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <label className="block">
                <span className="sr-only">Budget</span>
                <select
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                className="h-12 w-full rounded-lg border border-bone-line bg-white px-3 text-sm text-ink focus:border-forest focus:outline-none">
                
                  {budgets.map((option) =>
                <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                )}
                </select>
              </label>
              <label className="block">
                <span className="sr-only">Body type</span>
                <select
                value={body}
                onChange={(event) => setBody(event.target.value)}
                className="h-12 w-full rounded-lg border border-bone-line bg-white px-3 text-sm text-ink focus:border-forest focus:outline-none">
                
                  {bodies.map((option) =>
                <option key={option}>{option}</option>
                )}
                </select>
              </label>
              <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-forest px-6 text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-forest-light">
              
                <SearchIcon className="h-4 w-4" aria-hidden="true" />
                See matches
              </button>
            </div> :

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
              <label className="block">
                <span className="sr-only">Pickup point</span>
                <select
                value={pickup}
                onChange={(event) => setPickup(event.target.value)}
                className="h-12 w-full rounded-lg border border-bone-line bg-white px-3 text-sm text-ink focus:border-forest focus:outline-none">
                
                  {pickups.map((option) =>
                <option key={option}>{option}</option>
                )}
                </select>
              </label>
              <label className="block">
                <span className="sr-only">Pickup date</span>
                <input
                type="date"
                value={from}
                min={dateInputValue()}
                required
                onChange={(event) => setFrom(event.target.value)}
                className="h-12 w-full rounded-lg border border-bone-line bg-white px-3 text-sm text-ink focus:border-forest focus:outline-none" />
              
              </label>
              <label className="block">
                <span className="sr-only">Return date</span>
                <input
                type="date"
                value={to}
                min={nextDateInputValue(from)}
                required
                onChange={(event) => setTo(event.target.value)}
                className="h-12 w-full rounded-lg border border-bone-line bg-white px-3 text-sm text-ink focus:border-forest focus:outline-none" />
              
              </label>
              <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-forest px-6 text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-forest-light">
              
                <SearchIcon className="h-4 w-4" aria-hidden="true" />
                Check
              </button>
            </div>
          }
          <p className="px-1 pt-3 text-xs text-ink-600">
            Prefer to talk? WhatsApp{' '}
            <a
              href={`https://wa.me/${company.whatsapp.replace(/[^\d]/g, '')}`}
              className="font-semibold text-forest underline underline-offset-4">
              
              {company.whatsapp}
            </a>{' '}
            — we reply within the hour during business days.
          </p>
        </form>
      </div>
    </section>);

}
