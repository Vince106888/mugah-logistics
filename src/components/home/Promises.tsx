import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { useMode } from '../../contexts/ModeContext';
import { buyPromises, hirePromises, stats } from '../../data/site';
import { SHOWROOM_IMAGE } from '../../data/vehicles';

export function Promises() {
  const { mode } = useMode();
  const promises = mode === 'buy' ? buyPromises : hirePromises;

  return (
    <section className="border-y border-bone-line bg-white">
      <div className="mx-auto max-w-shell px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <h2 className="font-display text-4xl leading-tight tracking-tight text-ink lg:text-5xl">
              {mode === 'buy' ?
              'Twelve years of not selling people the wrong car.' :
              'A hire fleet that is somebody’s actual responsibility.'}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-600">
              {mode === 'buy' ?
              'Joseph Mugah started with two units on Kirinyaga Road in 2014. The business grew on referrals, which only happens if the car is still fine a year later.' :
              'Every unit that leaves our yard is tracked, insured and logged. When something goes wrong on the road — and occasionally it does — one phone call reaches a person who can fix it.'}
            </p>

            <div className="mt-10 overflow-hidden rounded-xl">
              <img
                src={SHOWROOM_IMAGE}
                alt="Inside the Mugah Logistics showroom in Nairobi"
                className="aspect-[16/10] w-full object-cover"
                loading="lazy" />
              
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-8">
              {stats.map((stat) =>
              <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl tracking-tight text-forest lg:text-4xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-sm text-ink-600">{stat.label}</span>
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div>
            <ol className="divide-y divide-bone-line border-t border-bone-line">
              {promises.map((promise) =>
              <li key={promise.title} className="py-7 first:pt-0 lg:py-8">
                  <h3 className="font-display text-2xl leading-snug tracking-tight text-ink lg:text-3xl">
                    {promise.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-600">
                    {promise.body}
                  </p>
                </li>
              )}
            </ol>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-8 transition-colors duration-150 ease-swift hover:text-ink">
              
              How we work, in detail
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>);

}
