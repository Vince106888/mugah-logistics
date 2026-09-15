import { company } from '../data/site';

export function Privacy() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-14 lg:px-8 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">Last updated 15 September 2026</p>
      <h1 className="mt-4 font-display text-5xl tracking-tight text-ink lg:text-6xl">Privacy notice</h1>
      <p className="mt-6 text-base leading-relaxed text-ink-600">
        This website does not use advertising trackers or collect payment details. When you choose to contact us, your message opens in WhatsApp or your email app and is sent only after you confirm it there.
      </p>

      <div className="mt-10 space-y-8 border-t border-bone-line pt-8 text-sm leading-relaxed text-ink-600">
        <section>
          <h2 className="text-lg font-semibold text-ink">Information you choose to send</h2>
          <p className="mt-2">
            Enquiries may include your name, phone number, email address, vehicle preferences, travel dates and pickup point. We use that information to answer your request, prepare a quote and arrange a viewing or hire.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-ink">Third-party services</h2>
          <p className="mt-2">
            WhatsApp and your email provider process messages under their own privacy terms. We do not ask for identity documents, card details or M-Pesa PINs through this public website.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-ink">Payment links and confirmations</h2>
          <p className="mt-2">
            A payment link displays the agreed amount and reference. M-Pesa STK and card buttons connect only after the relevant secure server integration is configured. Manual M-Pesa confirmations are placed into a WhatsApp message that you review and send yourself so the team can verify the transfer against the recipient's statement.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-ink">Your choices</h2>
          <p className="mt-2">
            You can ask us to correct or delete enquiry information we hold by emailing{' '}
            <a className="font-semibold text-forest underline underline-offset-4" href={`mailto:${company.email}`}>
              {company.email}
            </a>.
          </p>
        </section>
      </div>
    </article>
  );
}
