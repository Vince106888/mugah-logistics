import type { Vehicle } from '../types/vehicle';

const IMG = {
  prado: "/21074cfe-44d8-4a6c-a544-f282c1111d9b.jpg",

  harrier: "/47a63571-2a97-4b4a-b5aa-dc85c37abb60.jpg",

  forester: "/78141063-aea9-4926-b41b-7818c8c72b32.jpg",

  demio: "/e0971ecc-e1b2-4f7b-af10-9d7bc451b153.jpg",

  hiace: "/364ab086-8c4b-4248-b12e-3870b188697b.jpg",

  mercedes: "/b06e851f-f11b-46e5-9fe0-8108278af0d1.jpg",

  landcruiser: "/c6ba1df2-9eca-4fd1-be84-ce2b827b658a.jpg",

  axio: "/e27bade3-5627-420b-bec4-c13fc814eeb3.jpg"

};

export const HERO_IMAGE = "/42c14b29-885a-40fe-9b9a-15be641773cd.jpg";


export const SHOWROOM_IMAGE = "/cc5ce4aa-bf01-422c-9c29-afef68e38f3d.jpg";


export const vehicles: Vehicle[] = [
{
  id: 'v-01',
  slug: 'toyota-land-cruiser-prado-tx-2019',
  make: 'Toyota',
  model: 'Land Cruiser Prado',
  trim: 'TX 2.8 D-4D',
  year: 2019,
  bodyType: 'SUV',
  salePrice: 7450000,
  hireRate: 14500,
  transmission: 'Automatic',
  fuel: 'Diesel',
  engine: '2.8L Turbo Diesel',
  drive: '4WD',
  seats: 7,
  mileageKm: 68400,
  colour: 'Silver Metallic',
  condition: 'Foreign Used',
  yard: 'Mombasa Road Yard',
  image: IMG.prado,
  features: [
  'Full leather interior',
  'Reverse camera & sensors',
  'Dual-zone climate',
  'Roof rails',
  'Cruise control',
  'Downhill assist'],

  blurb:
  'The default answer for Kenyan roads. Comfortable enough for a Karen school run, tough enough for a Loita Hills weekend without thinking twice about the surface.',
  availability: ['buy', 'hire'],
  featured: true
},
{
  id: 'v-02',
  slug: 'toyota-harrier-premium-2020',
  make: 'Toyota',
  model: 'Harrier',
  trim: 'Premium 2.0',
  year: 2020,
  bodyType: 'SUV',
  salePrice: 4980000,
  hireRate: 9500,
  transmission: 'Automatic',
  fuel: 'Petrol',
  engine: '2.0L Petrol',
  drive: '2WD',
  seats: 5,
  mileageKm: 41200,
  colour: 'Pearl White',
  condition: 'Foreign Used',
  yard: 'Kilimani Showroom',
  image: IMG.harrier,
  features: [
  'Panoramic roof',
  'Power tailgate',
  'Half leather seats',
  'Apple CarPlay',
  'Blind spot monitor',
  'LED headlamps'],

  blurb:
  'A quiet, low-drama city SUV. Soft on Nairobi bumps, frugal on Waiyaki Way traffic, and it still looks the part outside a client meeting.',
  availability: ['buy', 'hire'],
  featured: true
},
{
  id: 'v-03',
  slug: 'mercedes-benz-c200-avantgarde-2018',
  make: 'Mercedes-Benz',
  model: 'C200',
  trim: 'Avantgarde',
  year: 2018,
  bodyType: 'Sedan',
  salePrice: 3890000,
  hireRate: 12000,
  transmission: 'Automatic',
  fuel: 'Petrol',
  engine: '2.0L Turbo Petrol',
  drive: '2WD',
  seats: 5,
  mileageKm: 57800,
  colour: 'Obsidian Black',
  condition: 'Locally Used',
  yard: 'Kilimani Showroom',
  image: IMG.mercedes,
  features: [
  'Burmester sound',
  'Ambient lighting',
  'Memory seats',
  'Keyless go',
  'Parking assist',
  'Full service history'],

  blurb:
  'Our most requested airport-transfer and wedding car. Chauffeur-ready with a driver, or a genuinely pleasant daily if you buy it.',
  availability: ['buy', 'hire'],
  featured: true
},
{
  id: 'v-04',
  slug: 'subaru-forester-xt-2017',
  make: 'Subaru',
  model: 'Forester',
  trim: 'XT Turbo',
  year: 2017,
  bodyType: 'Station Wagon',
  salePrice: 2650000,
  hireRate: 8000,
  transmission: 'Automatic',
  fuel: 'Petrol',
  engine: '2.0L Turbo Boxer',
  drive: 'AWD',
  seats: 5,
  mileageKm: 92500,
  colour: 'Deep Sea Blue',
  condition: 'Locally Used',
  yard: 'Mombasa Road Yard',
  image: IMG.forester,
  features: [
  'Symmetrical AWD',
  'Paddle shifters',
  'Sunroof',
  'New tyres',
  'Reverse camera',
  'Recent timing service'],

  blurb:
  'Symmetrical AWD and a turbo that actually pulls at altitude. The enthusiast pick for upcountry trips and murram shortcuts.',
  availability: ['buy', 'hire'],
  featured: false
},
{
  id: 'v-05',
  slug: 'toyota-land-cruiser-v8-zx-2016',
  make: 'Toyota',
  model: 'Land Cruiser V8',
  trim: 'ZX 4.5 D-4D',
  year: 2016,
  bodyType: 'SUV',
  salePrice: 11200000,
  hireRate: 22000,
  transmission: 'Automatic',
  fuel: 'Diesel',
  engine: '4.5L V8 Diesel',
  drive: '4WD',
  seats: 7,
  mileageKm: 118000,
  colour: 'Super White',
  condition: 'Locally Used',
  yard: 'Mombasa Road Yard',
  image: IMG.landcruiser,
  features: [
  'Cool box',
  'Rear entertainment',
  'Multi-terrain select',
  'Crawl control',
  'Ventilated seats',
  'Safari-ready suspension'],

  blurb:
  'Built for the long haul — Maasai Mara game drives, NGO field runs, or executive convoys. Hires out with a briefed safari driver on request.',
  availability: ['buy', 'hire'],
  featured: true
},
{
  id: 'v-06',
  slug: 'mazda-demio-skyactiv-2018',
  make: 'Mazda',
  model: 'Demio',
  trim: 'SkyActiv 1.3',
  year: 2018,
  bodyType: 'Hatchback',
  salePrice: 1150000,
  hireRate: 3500,
  transmission: 'Automatic',
  fuel: 'Petrol',
  engine: '1.3L Petrol',
  drive: '2WD',
  seats: 5,
  mileageKm: 74300,
  colour: 'Soul Red',
  condition: 'Foreign Used',
  yard: 'Kilimani Showroom',
  image: IMG.demio,
  features: [
  'Touchscreen infotainment',
  'Push start',
  'Alloy rims',
  'Very low fuel burn',
  'Reverse camera',
  'First-car friendly'],

  blurb:
  'Roughly 18 km per litre in city traffic. Our most popular first car and the cheapest way to keep a self-drive hire under budget.',
  availability: ['buy', 'hire'],
  featured: false
},
{
  id: 'v-07',
  slug: 'toyota-corolla-axio-hybrid-2019',
  make: 'Toyota',
  model: 'Corolla Axio',
  trim: 'Hybrid G',
  year: 2019,
  bodyType: 'Sedan',
  salePrice: 1780000,
  hireRate: 4500,
  transmission: 'Automatic',
  fuel: 'Hybrid',
  engine: '1.5L Hybrid',
  drive: '2WD',
  seats: 5,
  mileageKm: 63900,
  colour: 'Silver',
  condition: 'Foreign Used',
  yard: 'Kilimani Showroom',
  image: IMG.axio,
  features: [
  'Hybrid battery health report',
  'Eco drive monitor',
  'Fabric interior',
  'Bluetooth audio',
  'New brake pads',
  'Ideal for ride-hailing'],

  blurb:
  'The quiet workhorse of Nairobi — hybrid economy, cheap parts, and paperwork clean enough to go straight onto a ride-hailing platform.',
  availability: ['buy', 'hire'],
  featured: false
},
{
  id: 'v-08',
  slug: 'toyota-hiace-14-seater-2021',
  make: 'Toyota',
  model: 'Hiace',
  trim: '14-Seater GL',
  year: 2021,
  bodyType: 'Van',
  salePrice: null,
  hireRate: 13000,
  transmission: 'Manual',
  fuel: 'Diesel',
  engine: '2.8L Turbo Diesel',
  drive: '2WD',
  seats: 14,
  mileageKm: 88200,
  colour: 'Super White',
  condition: 'Locally Used',
  yard: 'Mombasa Road Yard',
  image: IMG.hiace,
  features: [
  'PSV licensed',
  'Seat belts on every seat',
  'Roof luggage carrier',
  'Professional driver included',
  'Onboard cooler',
  'Tracked 24/7'],

  blurb:
  'Group transfers, church trips, conference shuttles and team offsites. Hire-only, always with one of our vetted PSV drivers.',
  availability: ['hire'],
  featured: false
}];


export const getVehicleBySlug = (slug: string): Vehicle | undefined =>
vehicles.find((vehicle) => vehicle.slug === slug);
