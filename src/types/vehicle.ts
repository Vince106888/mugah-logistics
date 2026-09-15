export type SiteMode = 'buy' | 'hire';

export type BodyType =
'SUV' |
'Sedan' |
'Hatchback' |
'Van' |
'Pickup' |
'Station Wagon';

export type Transmission = 'Automatic' | 'Manual';

export type Fuel = 'Petrol' | 'Diesel' | 'Hybrid';

export interface Vehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  bodyType: BodyType;
  /** Sale price in KES. Null when the unit is hire-only. */
  salePrice: number | null;
  /** Daily hire rate in KES. Null when the unit is for sale only. */
  hireRate: number | null;
  transmission: Transmission;
  fuel: Fuel;
  engine: string;
  drive: '2WD' | '4WD' | 'AWD';
  seats: number;
  mileageKm: number;
  colour: string;
  condition: 'Locally Used' | 'Foreign Used' | 'Brand New';
  yard: string;
  image: string;
  features: string[];
  blurb: string;
  availability: SiteMode[];
  featured: boolean;
}