import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { BookingFlow } from '../components/hire/BookingFlow';
import { hireCategories, hirePromises } from '../data/site';
import { formatKES } from '../utils/format';

export function Hire() {
  return (
    <>
      <section className="border-b border-bone-line bg-white">
        <div className="mx-auto max-w-shell px-5 py-14 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
            <div>
              <h1 className="font-display text-5xl leading-[1.02] tracking-tightest text-ink lg:text-7xl">
                Hire a car in Kenya, without the counter queue.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-600 lg:text-lg">
                Forty-one vehicles, all tracked and comprehensively insured. We deliver to JKIA,
                Wilson, your hotel or your office — and we pick it up again when you are done.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <a
                href="#booking"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-forest">
                
                Start a booking
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors duration-150 ease-swift hover:bg-bone-dim">
                
                Corporate rates
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-shell px-5 py-16 lg:px-8 lg:py-20">
        <h2 className="font-display text-4xl leading-tight tracking-tight text-ink lg:text-5xl">
          Rates by category
        </h2>
        <p className="mt-3 max-w-xl text-base text-ink-600">
          Daily rates before the long-hire discount. Weekly saves 15%, monthly saves up to 30%.
        </p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <caption className="sr-only">Hire rates by vehicle category</caption>
            <thead>
              <tr className="border-b-2 border-ink text-[11px] uppercase tracking-[0.18em] text-ink-600">
                <th scope="col" className="py-3 pr-4 font-semibold">
                  Category
                </th>
                <th scope="col" className="py-3 pr-4 font-semibold">
                  Typical models
                </th>
                <th scope="col" className="py-3 pr-4 font-semibold">
                  Best for
                </th>
                <th scope="col" className="py-3 text-right font-semibold">
                  From / day
                </th>
              </tr>
            </thead>
            <tbody>
              {hireCategories.map((category) =>
              <tr key={category.name} className="border-b border-bone-line align-top">
                  <th scope="row" className="py-5 pr-4 font-display text-2xl tracking-tight text-ink">
                    {category.name}
                  </th>
                  <td className="py-5 pr-4 text-sm text-ink-600">{category.note}</td>
                  <td className="py-5 pr-4 text-sm text-ink-600">{category.detail}</td>
                  <td className="py-5 text-right text-base font-semibold text-forest">
                    {formatKES(category.from)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <ol className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {hirePromises.map((promise) =>
          <li key={promise.title} className="border-t border-bone-line pt-5">
              <h3 className="text-lg font-semibold text-ink">{promise.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{promise.body}</p>
            </li>
          )}
        </ol>
      </section>

      <BookingFlow />
    </>);

}
