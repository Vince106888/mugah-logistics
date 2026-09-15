import { Link } from 'react-router-dom';
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { company } from '../data/site';

export function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-shell px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-3xl tracking-tight text-bone">Mugah Logistics</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone/60">
              {company.tagline} A Nairobi family business selling inspected vehicles and running a
              tracked, insured hire fleet across Kenya since 2014.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-bone/40">
              NTSA registered dealer · TIMS agent
            </p>
          </div>

          <nav aria-label="Explore">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-bright">
              Explore
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {[
              { to: '/inventory', label: 'Browse inventory' },
              { to: '/hire', label: 'Book a hire' },
              { to: '/about', label: 'About us' },
              { to: '/contact', label: 'Contact & financing' }].
              map((item) =>
              <li key={item.to}>
                  <Link
                  to={item.to}
                  className="text-bone/70 transition-colors duration-150 ease-swift hover:text-bone">
                  
                    {item.label}
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/privacy"
                  className="text-bone/70 transition-colors duration-150 ease-swift hover:text-bone">
                  Privacy notice
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-bright">
              Services
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-bone/70">
              <li>Vehicle sales &amp; trade-ins</li>
              <li>Self-drive &amp; chauffeur hire</li>
              <li>Corporate fleet contracts</li>
              <li>Import on order</li>
              <li>Asset financing support</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-bright">
              Find us
            </h2>
            <ul className="mt-5 space-y-4 text-sm text-bone/70">
              <li className="flex gap-3">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-bone/40" aria-hidden="true" />
                <span>{company.showroom}</span>
              </li>
              <li className="flex gap-3">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-bone/40" aria-hidden="true" />
                <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="hover:text-bone">
                  {company.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-bone/40" aria-hidden="true" />
                <a href={`mailto:${company.email}`} className="hover:text-bone">
                  {company.email}
                </a>
              </li>
              <li className="flex gap-3">
                <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-bone/40" aria-hidden="true" />
                <span>Mon – Fri, 8:00am – 6:30pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-bone/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Mugah Logistics Ltd. Nairobi, Kenya.</p>
          <p>Prices in Kenya shillings and exclusive of transfer fees unless stated.</p>
        </div>
      </div>
    </footer>);

}
