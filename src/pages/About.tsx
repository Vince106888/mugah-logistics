import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { SHOWROOM_IMAGE } from '../data/vehicles';
import { company, stats, team } from '../data/site';

const timeline = [
{
  year: '2014',
  title: 'Two units on Kirinyaga Road',
  body: 'Joseph Mugah starts trading with a Toyota Fielder and a Nissan Note, sourcing directly from Mombasa port clearing agents.'
},
{
  year: '2017',
  title: 'The Mombasa Road yard',
  body: 'We take a permanent yard and hire Peter to run a workshop, so every unit is inspected and serviced before it is listed.'
},
{
  year: '2020',
  title: 'Hire fleet begins',
  body: 'Six vehicles put on hire during the pandemic when buyers paused. It grows into a 41-unit fleet with NGO and corporate contracts.'
},
{
  year: '2024',
  title: 'Kilimani showroom',
  body: 'An indoor showroom at Chaka Place for executive stock, with financing handled on site by Grace and her bank partners.'
}];


const values = [
{
  title: 'The report comes before the price',
  body: 'If a unit has a repaired panel, a hybrid battery at 70% health or a gearbox we have rebuilt, it is written down and handed to you.'
},
{
  title: 'We say no to cars',
  body: 'Roughly one in four vehicles we inspect at auction or from the public never reaches our floor. Turning stock away is cheaper than a bad referral.'
},
{
  title: 'One number, a real person',
  body: 'No call centre. The line on this site rings a phone in our office, and after hours it rings Amina on the fleet desk.'
}];


export function About() {
  return (
    <>
      <section className="mx-auto max-w-shell px-5 py-14 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-ink-600">Nairobi, Kenya · since 2014</p>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] tracking-tightest text-ink lg:text-7xl">
            A family car business that grew on referrals.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-600 lg:text-lg">
            {company.name} sells inspected vehicles and runs a tracked hire fleet from two sites in
            Nairobi. Fourteen staff, one workshop, and 1,400 cars delivered to people who mostly
            heard about us from someone they trust.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl">
          <img
            src={SHOWROOM_IMAGE}
            alt="The Mugah Logistics showroom at Chaka Place, Kilimani"
            className="aspect-[21/9] w-full object-cover" />
          
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-bone-line pt-10 lg:grid-cols-4">
          {stats.map((stat) =>
          <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-4xl tracking-tight text-forest lg:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-2 block text-sm text-ink-600">{stat.label}</span>
              </dd>
            </div>
          )}
        </dl>
      </section>

      <section className="border-y border-bone-line bg-white">
        <div className="mx-auto max-w-shell px-5 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <h2 className="font-display text-4xl leading-tight tracking-tight text-ink lg:text-5xl">
              How we got here
            </h2>
            <ol className="relative border-l border-bone-line pl-8">
              {timeline.map((item) =>
              <li key={item.year} className="relative pb-10 last:pb-0">
                  <span
                  className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-forest"
                  aria-hidden="true" />
                
                  <p className="font-display text-2xl tracking-tight text-amber">{item.year}</p>
                  <h3 className="mt-1 text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-600">{item.body}</p>
                </li>
              )}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-shell px-5 py-16 lg:px-8 lg:py-24">
        <h2 className="max-w-2xl font-display text-4xl leading-tight tracking-tight text-ink lg:text-5xl">
          What we hold ourselves to
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {values.map((value) =>
          <div key={value.title} className="border-t-2 border-ink pt-5">
              <h3 className="text-lg font-semibold leading-snug text-ink">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{value.body}</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-forest">
        <div className="mx-auto max-w-shell px-5 py-16 lg:px-8 lg:py-24">
          <h2 className="max-w-2xl font-display text-4xl leading-tight tracking-tight text-bone lg:text-5xl">
            The people you will actually deal with
          </h2>
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) =>
            <li key={member.name} className="flex flex-col border-t border-white/20 pt-5">
                <h3 className="text-lg font-semibold text-bone">{member.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-amber-bright">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-bone/70">{member.bio}</p>
              </li>
            )}
          </ul>

          <div className="mt-14 flex flex-wrap gap-4">
            <Link
              to="/inventory"
              className="inline-flex items-center gap-2 rounded-full bg-amber-bright px-6 py-3 text-sm font-semibold text-ink transition-colors duration-150 ease-swift hover:bg-amber">
              
              See what is in stock
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-bone transition-colors duration-150 ease-swift hover:bg-white/10">
              
              Visit the showroom
            </Link>
          </div>
        </div>
      </section>
    </>);

}
