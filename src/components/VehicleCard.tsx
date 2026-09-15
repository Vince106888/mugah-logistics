import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, FuelIcon, GaugeIcon, UsersIcon } from 'lucide-react';
import type { SiteMode, Vehicle } from '../types/vehicle';
import { formatKES, formatMileage } from '../utils/format';

interface VehicleCardProps {
  vehicle: Vehicle;
  mode: SiteMode;
}

export function VehicleCard({ vehicle, mode }: VehicleCardProps) {
  const hireOnly = !vehicle.availability.includes('buy');
  const showHirePrice = mode === 'hire' || hireOnly;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-bone-line bg-white">
      <Link
        to={`/vehicle/${vehicle.slug}`}
        className="relative block overflow-hidden bg-bone-dim"
        tabIndex={-1}
        aria-hidden="true">
        
        <img
          src={vehicle.image}
          alt=""
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 ease-swift group-hover:scale-[1.03]"
          loading="lazy" />
        
        <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-bone">
          {hireOnly ? 'Hire only' : vehicle.condition}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-600">
          {vehicle.year} · {vehicle.bodyType}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight tracking-tight text-ink">
          <Link
            to={`/vehicle/${vehicle.slug}`}
            className="transition-colors duration-150 ease-swift hover:text-forest">
            
            {vehicle.make} {vehicle.model}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-ink-600">{vehicle.trim}</p>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-ink-600">
          <li className="flex items-center gap-1.5">
            <GaugeIcon className="h-3.5 w-3.5 text-forest-mid" aria-hidden="true" />
            {formatMileage(vehicle.mileageKm)}
          </li>
          <li className="flex items-center gap-1.5">
            <FuelIcon className="h-3.5 w-3.5 text-forest-mid" aria-hidden="true" />
            {vehicle.fuel}
          </li>
          <li className="flex items-center gap-1.5">
            <UsersIcon className="h-3.5 w-3.5 text-forest-mid" aria-hidden="true" />
            {vehicle.seats} seats
          </li>
        </ul>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-bone-line pt-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-600">
              {showHirePrice ? 'Per day' : 'Asking price'}
            </p>
            <p className="mt-1 text-lg font-semibold text-ink">
              {showHirePrice ?
              vehicle.hireRate ?
              formatKES(vehicle.hireRate) :
              'Not for hire' :
              vehicle.salePrice ?
              formatKES(vehicle.salePrice) :
              'Not for sale'}
            </p>
          </div>
          <Link
            to={`/vehicle/${vehicle.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-bone-dim px-4 py-2 text-sm font-semibold text-ink transition-colors duration-150 ease-swift hover:bg-forest hover:text-bone">
            
            Details
            <ArrowUpRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>);

}
