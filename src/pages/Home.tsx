import { Hero } from '../components/home/Hero';
import { FeaturedFleet } from '../components/home/FeaturedFleet';
import { Promises } from '../components/home/Promises';
import { Process } from '../components/home/Process';
import { DigitalDeal } from '../components/home/DigitalDeal';
import { Testimonials } from '../components/home/Testimonials';
import { CrossSell } from '../components/home/CrossSell';

export function Home() {
  return (
    <>
      <Hero />
      <FeaturedFleet />
      <Promises />
      <Process />
      <DigitalDeal />
      <Testimonials />
      <CrossSell />
    </>);

}
