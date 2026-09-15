import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { MenuIcon, PhoneIcon, XIcon } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import { company } from '../data/site';
import { siteConfig } from '../config';

const links = [
{ to: '/inventory', label: 'Inventory' },
{ to: '/hire', label: 'Hire & booking' },
{ to: '/payments', label: 'Payments' },
{ to: '/about', label: 'About us' },
{ to: '/contact', label: 'Contact' }];


const mobileLinks = siteConfig.demoFeaturesEnabled
  ? [...links, { to: '/deals', label: 'Demo console' }]
  : links;

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-bone-line bg-bone/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-shell items-center gap-6 px-5 lg:h-20 lg:px-8">
        <Link to="/" className="group flex items-center gap-3" aria-label={`${company.name} home`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-forest">
            <span className="font-display text-lg leading-none text-amber-soft">M</span>
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl tracking-tight text-ink">Mugah</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-600">
              Logistics
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-6 lg:flex" aria-label="Main">
          {links.map((link) =>
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
            `text-sm font-medium transition-colors duration-150 ease-swift ${
            isActive ? 'text-forest' : 'text-ink-600 hover:text-ink'}`

            }>
            
              {link.label}
            </NavLink>
          )}
        </nav>

        <div className="ml-auto hidden items-center gap-4 lg:ml-0 lg:flex">
          {siteConfig.demoFeaturesEnabled && <NavLink
            to="/deals"
            className={({ isActive }) =>
            `text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-150 ease-swift ${
            isActive ? 'text-forest' : 'text-ink-600 hover:text-ink'}`

            }>
            
            Demo console
          </NavLink>}
          <ModeToggle />
          <a
            href={`tel:${company.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-forest">
            
            <PhoneIcon className="h-4 w-4" aria-hidden="true" />
            Call us
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md border border-bone-line text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}>
          
          {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {open &&
      <div id="mobile-navigation" className="border-t border-bone-line bg-bone px-5 pb-6 pt-4 lg:hidden">
          <ModeToggle className="w-full justify-center" />
          <nav className="mt-4 flex flex-col" aria-label="Mobile">
            {mobileLinks.map((link) =>
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
            `border-b border-bone-line py-3 text-base font-medium ${
            isActive ? 'text-forest' : 'text-ink'}`

            }>
            
                {link.label}
              </NavLink>
          )}
          </nav>
          <a
          href={`tel:${company.phone.replace(/\s/g, '')}`}
          className="mt-5 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-bone">
          
            <PhoneIcon className="h-4 w-4" aria-hidden="true" />
            {company.phone}
          </a>
        </div>
      }
    </header>);

}
