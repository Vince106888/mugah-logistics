import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../config';
import { getVehicleBySlug } from '../data/vehicles';
import { formatKES } from '../utils/format';

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Mugah Logistics | Cars for Sale & Hire in Nairobi',
    description:
      'Buy inspected vehicles or hire a tracked, insured car in Nairobi. Test drives, financing support, airport delivery and Kenya-wide assistance.'
  },
  '/inventory': {
    title: 'Cars for Sale in Nairobi | Mugah Logistics',
    description:
      'Browse inspected cars for sale in Nairobi with verified paperwork, transparent pricing, trade-ins and asset-finance support.'
  },
  '/hire': {
    title: 'Car Hire in Nairobi & Across Kenya | Mugah Logistics',
    description:
      'Book self-drive or chauffeured car hire with airport delivery, comprehensive insurance and countrywide roadside support.'
  },
  '/about': {
    title: 'About Mugah Logistics | Nairobi Vehicle Specialists',
    description:
      'Meet the Nairobi team behind Mugah Logistics and learn how every vehicle is inspected, verified and supported.'
  },
  '/contact': {
    title: 'Contact Mugah Logistics | Nairobi Showroom & Yard',
    description:
      'Contact Mugah Logistics for vehicle sales, hire, trade-ins, financing or imports. Visit Kilimani or our Mombasa Road yard.'
  },
  '/privacy': {
    title: 'Privacy Notice | Mugah Logistics',
    description: 'How Mugah Logistics handles enquiries and personal information submitted through this website.'
  },
  '/pay': {
    title: 'M-Pesa Payment | Mugah Logistics',
    description: 'Complete an agreed Mugah Logistics payment using M-Pesa Send Money and submit the transaction code for verification.'
  }
};

function setMeta(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const vehicle = pathname.startsWith('/vehicle/')
      ? getVehicleBySlug(decodeURIComponent(pathname.slice('/vehicle/'.length)))
      : undefined;
    const meta = vehicle
      ? {
          title: `${vehicle.year} ${vehicle.make} ${vehicle.model} | Mugah Logistics`,
          description: `${vehicle.trim}, ${vehicle.mileageKm.toLocaleString('en-KE')} km. ${
            vehicle.salePrice ? `${formatKES(vehicle.salePrice)} to buy.` : ''
          }${vehicle.hireRate ? ` ${formatKES(vehicle.hireRate)} per day to hire.` : ''}`.trim()
        }
      : pageMeta[pathname] ?? {
          title: 'Page not found | Mugah Logistics',
          description: 'Find inspected vehicles for sale and hire from Mugah Logistics in Nairobi.'
        };

    document.title = meta.title;
    setMeta('description', meta.description);
    setMeta('og:title', meta.title, 'property');
    setMeta('og:description', meta.description, 'property');
    setMeta('og:url', `${siteConfig.url}${pathname}`, 'property');
    setMeta('robots', pathname === '/pay' ? 'noindex,nofollow' : 'index,follow');

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${siteConfig.url}${pathname}`;
  }, [pathname]);

  return null;
}
