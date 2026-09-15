import { useMode } from '../../contexts/ModeContext';
import { steps } from '../../data/site';

export function Process() {
  const { mode } = useMode();
  const activeSteps = steps[mode];

  return (
    <section className="mx-auto max-w-shell px-5 py-16 lg:px-8 lg:py-24">
      <div className="max-w-2xl">
        <h2 className="font-display text-4xl leading-tight tracking-tight text-ink lg:text-5xl">
          {mode === 'buy' ? 'From enquiry to logbook' : 'From enquiry to keys'}
        </h2>
        <p className="mt-3 text-base text-ink-600">
          {mode === 'buy' ?
          'Most sales close in under a week, financing included.' :
          'Confirmed hires are usually on the road the same day.'}
        </p>
      </div>

      <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {activeSteps.map((step, index) =>
        <li key={step.title} className="relative flex flex-col border-t-2 border-ink pt-5">
            <span
            className="absolute -top-[13px] left-0 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-bone"
            aria-hidden="true">
            
              {index + 1}
            </span>
            <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.body}</p>
          </li>
        )}
      </ol>
    </section>);

}
