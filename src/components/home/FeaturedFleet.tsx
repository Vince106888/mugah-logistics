import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import { useMode } from '../../contexts/ModeContext';
import { vehicles } from '../../data/vehicles';
import { VehicleCard } from '../VehicleCard';
import { formatKES, formatMileage } from '../../utils/format';

export function FeaturedFleet() {
  const { mode } = useMode();
  const available = vehicles.filter((vehicle) => vehicle.availability.includes(mode));
  const [spotlight, ...rest] = available.filter((vehicle) => vehicle.featured).length ?
  available.filter((vehicle) => vehicle.featured) :
  available;
  const supporting = rest.slice(0, 3);

  const price =
  mode === 'hire' ?
  `${formatKES(spotlight.hireRate ?? 0)} / day` :
  formatKES(spotlight.salePrice ?? 0);

  return (
    <section className="mx-auto max-w-shell px-5 py-16 lg:px-8 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="font-display text-4xl leading-tight tracking-tight text-ink lg:text-5xl">
            {mode === 'buy' ? 'On the floor this week' : 'Ready to go out today'}
          </h2>
          <p className="mt-3 text-base text-ink-600">
            {mode === 'buy' ?
            `${available.length} units in stock, each with a written inspection report and a verified logbook.` :
            'Fleet availability updates every morning. Rates below include insurance and unlimited support.'}
          </p>
        </div>
        <Link
          to={mode === 'buy' ? '/inventory' : '/hire'}
          className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-150 ease-swift hover:bg-ink hover:text-bone">
          
          {mode === 'buy' ? 'See all inventory' : 'See all hire rates'}
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <article className="mt-10 grid overflow-hidden rounded-2xl border border-bone-line bg-white lg:grid-cols-[1.25fr_1fr]">
        <div className="relative bg-bone-dim">
          <img
            src={spotlight.image}
            alt={`${spotlight.year} ${spotlight.make} ${spotlight.model}`}
            className="h-full min-h-[280px] w-full object-cover"
            loading="lazy"
            decoding="async" />
          
          <span className="absolute left-4 top-4 rounded-full bg-amber-bright px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink">
            Pick of the week
          </span>
        </div>
        <div className="flex flex-col p-6 lg:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-600">
            {spotlight.year} · {spotlight.condition} · {spotlight.yard}
          </p>
          <h3 className="mt-3 font-display text-3xl leading-tight tracking-tight text-ink lg:text-4xl">
            {spotlight.make} {spotlight.model}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-ink-600">{spotlight.blurb}</p>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-bone-line py-5 text-sm">
            <div>
              <dt className="text-ink-600">Engine</dt>
              <dd className="mt-0.5 font-medium text-ink">{spotlight.engine}</dd>
            </div>
            <div>
              <dt className="text-ink-600">Drive</dt>
              <dd className="mt-0.5 font-medium text-ink">
                {spotlight.drive} · {spotlight.transmission}
              </dd>
            </div>
            <div>
              <dt className="text-ink-600">Mileage</dt>
              <dd className="mt-0.5 font-medium text-ink">{formatMileage(spotlight.mileageKm)}</dd>
            </div>
            <div>
              <dt className="text-ink-600">Seats</dt>
              <dd className="mt-0.5 font-medium text-ink">{spotlight.seats}</dd>
            </div>
          </dl>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-600">
            {spotlight.features.slice(0, 4).map((feature) =>
            <li key={feature} className="flex items-center gap-1.5">
                <CheckIcon className="h-3.5 w-3.5 text-forest-mid" aria-hidden="true" />
                {feature}
              </li>
            )}
          </ul>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
            <p className="font-display text-3xl tracking-tight text-forest">{price}</p>
            <Link
              to={`/vehicle/${spotlight.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-forest">
              
              {mode === 'buy' ? 'Book a test drive' : 'Reserve this car'}
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {supporting.map((vehicle) =>
        <VehicleCard key={vehicle.id} vehicle={vehicle} mode={mode} />
        )}
      </div>
    </section>);

}
