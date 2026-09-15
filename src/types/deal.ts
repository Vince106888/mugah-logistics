export type DealType = 'sale' | 'hire';

export type DealStage =
'enquiry' |
'link-sent' |
'details-in' |
'signed' |
'deposit-paid' |
'delivered';

export type PaymentStatus = 'unpaid' | 'pending' | 'partial' | 'paid';

export type PaymentMethod = 'mpesa' | 'card' | 'bank';

export interface CustomerRecord {
  name: string;
  phone: string;
  email: string;
  idNumber: string;
  kraPin: string;
  address: string;
  licenceNumber: string;
  nextOfKin: string;
}

export interface DealActivity {
  id: string;
  at: string;
  label: string;
  actor: string;
  channel?: 'whatsapp' | 'sms' | 'email' | 'system' | 'in-person';
}

export interface DealDocument {
  id: string;
  name: string;
  kind: 'agreement' | 'id' | 'licence' | 'inspection' | 'receipt' | 'logbook';
  status: 'awaiting' | 'received' | 'signed';
  note?: string;
}

export interface HireTerms {
  pickup: string;
  from: string;
  to: string;
  days: number;
  withDriver: boolean;
}

export interface Deal {
  id: string;
  ref: string;
  token: string;
  type: DealType;
  vehicleSlug: string;
  vehicleLabel: string;
  stage: DealStage;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod | null;
  /** Full contract value in KES. */
  totalAmount: number;
  /** Amount requested through the payment link. */
  depositDue: number;
  amountPaid: number;
  signedAt: string | null;
  signatureName: string | null;
  createdAt: string;
  updatedAt: string;
  owner: string;
  source: 'Website enquiry' | 'WhatsApp' | 'Walk-in' | 'Referral' | 'Corporate account';
  customer: CustomerRecord;
  hire: HireTerms | null;
  activity: DealActivity[];
  documents: DealDocument[];
  notes: string;
}