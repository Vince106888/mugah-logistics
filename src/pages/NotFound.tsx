import { ArrowLeftIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-shell items-center px-5 py-20 lg:px-8">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">404 · Page not found</p>
        <h1 className="mt-4 font-display text-5xl leading-tight tracking-tight text-ink lg:text-7xl">
          This road does not go anywhere.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink-600">
          The page may have moved, or the link may be out of date. Head back to the showroom and we will get you moving again.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bone transition-colors hover:bg-forest">
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          Back to the homepage
        </Link>
      </div>
    </section>
  );
}
