import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { VehicleCard } from '../components/VehicleCard';
import { ModeToggle } from '../components/ModeToggle';
import { useMode } from '../contexts/ModeContext';
import { vehicles } from '../data/vehicles';
import type { BodyType } from '../types/vehicle';

const bodyTypes: BodyType[] = ['SUV', 'Sedan', 'Hatchback', 'Station Wagon', 'Van'];
const fuels = ['Petrol', 'Diesel', 'Hybrid'];
const transmissions = ['Automatic', 'Manual'];

type SortKey = 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc';

const sorts: {value: SortKey;label: string;}[] = [
{ value: 'price-asc', label: 'Price: low to high' },
{ value: 'price-desc', label: 'Price: high to low' },
{ value: 'year-desc', label: 'Newest year first' },
{ value: 'mileage-asc', label: 'Lowest mileage' }];


export function Inventory() {
  const { mode } = useMode();
  const [params] = useSearchParams();

  const [query, setQuery] = useState('');
  const [maxBudget, setMaxBudget] = useState<string>(params.get('budget') ?? '');
  const initialBody = params.get('body');
  const [selectedBodies, setSelectedBodies] = useState<string[]>(
    initialBody && bodyTypes.includes(initialBody as BodyType) ? [initialBody] : []
  );
  const [selectedFuels, setSelectedFuels] = useState<string[]>([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>('price-asc');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = (value: string, list: string[], setList: (next: string[]) => void) => {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  const priceOf = (salePrice: number | null, hireRate: number | null) =>
  mode === 'hire' ? hireRate ?? Number.MAX_SAFE_INTEGER : salePrice ?? Number.MAX_SAFE_INTEGER;

  const results = useMemo(() => {
    const budget = maxBudget ? Number(maxBudget) : null;
    const filtered = vehicles.filter((vehicle) => {
      if (!vehicle.availability.includes(mode)) return false;
      const label = `${vehicle.make} ${vehicle.model} ${vehicle.trim}`.toLowerCase();
      if (query && !label.includes(query.toLowerCase())) return false;
      if (selectedBodies.length && !selectedBodies.includes(vehicle.bodyType)) return false;
      if (selectedFuels.length && !selectedFuels.includes(vehicle.fuel)) return false;
      if (selectedTransmissions.length && !selectedTransmissions.includes(vehicle.transmission))
      return false;
      if (budget && mode === 'buy' && (vehicle.salePrice ?? Infinity) > budget) return false;
      return true;
    });

    return filtered.sort((a, b) => {
      switch (sort) {
        case 'price-desc':
          return priceOf(b.salePrice, b.hireRate) - priceOf(a.salePrice, a.hireRate);
        case 'year-desc':
          return b.year - a.year;
        case 'mileage-asc':
          return a.mileageKm - b.mileageKm;
        default:
          return priceOf(a.salePrice, a.hireRate) - priceOf(b.salePrice, b.hireRate);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, query, maxBudget, selectedBodies, selectedFuels, selectedTransmissions, sort]);

  const activeCount =
  selectedBodies.length +
  selectedFuels.length +
  selectedTransmissions.length + (
  maxBudget ? 1 : 0) + (
  query ? 1 : 0);

  const clearAll = () => {
    setQuery('');
    setMaxBudget('');
    setSelectedBodies([]);
    setSelectedFuels([]);
    setSelectedTransmissions([]);
  };

  const checkboxGroup = (
  legend: string,
  options: string[],
  list: string[],
  setList: (next: string[]) => void) =>

  <fieldset className="border-t border-bone-line pt-5">
      <legend className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-600">
        {legend}
      </legend>
      <div className="space-y-2.5">
        {options.map((option) =>
      <label key={option} className="flex cursor-pointer items-center gap-3 text-sm text-ink">
            <input
          type="checkbox"
          checked={list.includes(option)}
          onChange={() => toggle(option, list, setList)}
          className="h-4 w-4 rounded border-bone-line text-forest focus:ring-forest" />
        
            {option}
          </label>
      )}
      </div>
    </fieldset>;


  return (
    <div className="mx-auto max-w-shell px-5 py-10 lg:px-8 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl leading-tight tracking-tight text-ink lg:text-6xl">
            {mode === 'buy' ? 'Cars for sale in Nairobi' : 'The hire fleet'}
          </h1>
          <p className="mt-3 text-base text-ink-600">
            {mode === 'buy' ?
            'Every unit inspected over 121 points, logbook verified with NTSA, and available to test drive today.' :
            'Daily rates include comprehensive insurance, countrywide recovery and a full tank on collection.'}
          </p>
        </div>
        <ModeToggle />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-12">
        <div>
          <button
            type="button"
            onClick={() => setFiltersOpen((value) => !value)}
            className="mb-4 inline-flex w-full items-center justify-between rounded-lg border border-bone-line bg-white px-4 py-3 text-sm font-semibold text-ink lg:hidden"
            aria-expanded={filtersOpen}>
            
            <span className="inline-flex items-center gap-2">
              <SlidersHorizontalIcon className="h-4 w-4" aria-hidden="true" />
              Filters {activeCount > 0 && `(${activeCount})`}
            </span>
            {filtersOpen ? <XIcon className="h-4 w-4" /> : null}
          </button>

          <aside
            className={`${filtersOpen ? 'block' : 'hidden'} lg:block lg:sticky lg:top-28`}
            aria-label="Filter vehicles">
            
            <div className="space-y-6">
              <label className="block">
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-600">
                  Search
                </span>
                <span className="relative block">
                  <SearchIcon
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-600"
                    aria-hidden="true" />
                  
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Prado, Harrier, Demio…"
                    className="h-11 w-full rounded-lg border border-bone-line bg-white pl-9 pr-3 text-sm text-ink focus:border-forest focus:outline-none" />
                  
                </span>
              </label>

              {mode === 'buy' &&
              <label className="block border-t border-bone-line pt-5">
                  <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-600">
                    Maximum price
                  </span>
                  <select
                  value={maxBudget}
                  onChange={(event) => setMaxBudget(event.target.value)}
                  className="h-11 w-full rounded-lg border border-bone-line bg-white px-3 text-sm text-ink focus:border-forest focus:outline-none">
                  
                    <option value="">Any price</option>
                    <option value="2000000">Up to KES 2M</option>
                    <option value="5000000">Up to KES 5M</option>
                    <option value="8000000">Up to KES 8M</option>
                    <option value="99000000">No limit</option>
                  </select>
                </label>
              }

              {checkboxGroup('Body type', bodyTypes, selectedBodies, setSelectedBodies)}
              {checkboxGroup('Fuel', fuels, selectedFuels, setSelectedFuels)}
              {checkboxGroup(
                'Transmission',
                transmissions,
                selectedTransmissions,
                setSelectedTransmissions
              )}

              {activeCount > 0 &&
              <button
                type="button"
                onClick={clearAll}
                className="text-sm font-semibold text-forest underline underline-offset-4">
                
                  Clear all filters
                </button>
              }
            </div>
          </aside>
        </div>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-bone-line pb-4">
            <p className="text-sm text-ink-600" role="status">
              <span className="font-semibold text-ink">{results.length}</span>{' '}
              {results.length === 1 ? 'vehicle' : 'vehicles'} available to{' '}
              {mode === 'buy' ? 'buy' : 'hire'}
            </p>
            <label className="flex items-center gap-2 text-sm text-ink-600">
              Sort
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="h-10 rounded-lg border border-bone-line bg-white px-3 text-sm text-ink focus:border-forest focus:outline-none">
                
                {sorts.map((option) =>
                <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                )}
              </select>
            </label>
          </div>

          {results.length > 0 ?
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((vehicle) =>
            <VehicleCard key={vehicle.id} vehicle={vehicle} mode={mode} />
            )}
            </div> :

          <div className="mt-10 rounded-xl border border-dashed border-bone-line bg-white px-6 py-16 text-center">
              <h2 className="font-display text-2xl tracking-tight text-ink">
                Nothing matches that yet
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-ink-600">
                Stock turns over weekly and we import to order. Loosen a filter, or tell us the spec
                and budget and we will source it — typically 8 to 10 weeks from Japan or the UK.
              </p>
              <button
              type="button"
              onClick={clearAll}
              className="mt-6 inline-flex items-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-forest-light">
              
                Reset filters
              </button>
            </div>
          }
        </div>
      </div>
    </div>);

}
