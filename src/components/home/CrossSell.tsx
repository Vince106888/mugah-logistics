import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { useMode } from '../../contexts/ModeContext';
import { hireCategories } from '../../data/site';
import { formatKES } from '../../utils/format';

export function CrossSell() {
  const { mode, setMode } = useMode();

  if (mode === 'buy') {
    return (
      <section className="mx-auto max-w-shell px-5 pb-20 lg:px-8 lg:pb-28">
        <div className="rounded-2xl bg-ink px-6 py-12 lg:px-14 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-16">
            <div>
              <h2 className="font-display text-4xl leading-tight tracking-tight text-bone lg:text-5xl">
                Not buying yet? Hire one for the weekend.
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-bone/70">
                Forty-one units on the hire fleet — economy runabouts, chauffeured executives,
                safari-prepped 4WDs and 14-seaters. It is also the cheapest way to live with a model
                for three days before you commit to buying one.
              </p>
              <button
                type="button"
                onClick={() => setMode('hire')}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-bright px-6 py-3 text-sm font-semibold text-ink transition-colors duration-150 ease-swift hover:bg-amber">
                
                Switch to hire
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <dl className="divide-y divide-white/10 border-y border-white/10">
              {hireCategories.map((category) =>
              <div key={category.name} className="flex items-baseline gap-4 py-4">
                  <dt className="flex-1">
                    <span className="block text-base font-semibold text-bone">{category.name}</span>
                    <span className="block text-sm text-bone/50">{category.note}</span>
                  </dt>
                  <dd className="shrink-0 text-right text-sm text-bone/70">
                    from{' '}
                    <span className="font-semibold text-amber-bright">
                      {formatKES(category.from)}
                    </span>
                    /day
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>);

  }

  return (
    <section className="mx-auto max-w-shell px-5 pb-20 lg:px-8 lg:pb-28">
      <div className="rounded-2xl bg-ink px-6 py-12 lg:px-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="font-display text-4xl leading-tight tracking-tight text-bone lg:text-5xl">
              Hired it three times? Buy it instead.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-bone/70">
              Anything in the hire fleet marked for sale can be bought with its full service history
              — and we credit up to 30 days of your hire spend against the purchase price. Ask Grace
              about the asset finance file while you are at it.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <button
              type="button"
              onClick={() => setMode('buy')}
              className="inline-flex items-center gap-2 rounded-full bg-amber-bright px-6 py-3 text-sm font-semibold text-ink transition-colors duration-150 ease-swift hover:bg-amber">
              
              Switch to buying
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-white/10">
              
              Talk about financing
            </Link>
          </div>
        </div>
      </div>
    </section>);

}
