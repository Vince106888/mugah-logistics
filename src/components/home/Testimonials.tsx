import { QuoteIcon } from 'lucide-react';
import { testimonials } from '../../data/site';

export function Testimonials() {
  const [lead, ...others] = testimonials;

  return (
    <section className="bg-forest">
      <div className="mx-auto max-w-shell px-5 py-16 lg:px-8 lg:py-24">
        <h2 className="max-w-2xl font-display text-4xl leading-tight tracking-tight text-bone lg:text-5xl">
          What people say after the sale, not during it.
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <figure className="flex flex-col">
            <QuoteIcon className="h-8 w-8 text-amber-bright" aria-hidden="true" />
            <blockquote className="mt-6 font-display text-2xl leading-snug tracking-tight text-bone sm:text-3xl lg:text-[2.1rem]">
              “{lead.quote}”
            </blockquote>
            <figcaption className="mt-auto pt-8 text-sm">
              <span className="block font-semibold text-bone">{lead.name}</span>
              <span className="block text-bone/60">{lead.role}</span>
              <span className="mt-2 block text-xs uppercase tracking-[0.18em] text-amber-bright">
                {lead.context}
              </span>
            </figcaption>
          </figure>

          <div className="grid gap-8 self-start">
            {others.map((item) =>
            <figure
              key={item.name}
              className="flex flex-col border-t border-white/15 pt-7 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-7">
              
                <blockquote className="text-base leading-relaxed text-bone/80">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="block font-semibold text-bone">{item.name}</span>
                  <span className="block text-bone/60">{item.role}</span>
                  <span className="mt-2 block text-xs uppercase tracking-[0.18em] text-amber-bright">
                    {item.context}
                  </span>
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </div>
    </section>);

}
