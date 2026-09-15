import type { Deal } from '../types/deal';

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 3_600_000).toISOString();

const emptyCustomer = {
  name: '',
  phone: '',
  email: '',
  idNumber: '',
  kraPin: '',
  address: '',
  licenceNumber: '',
  nextOfKin: ''
};

export const deals: Deal[] = [
{
  id: 'd-2417',
  ref: 'MGH-2417',
  token: 'k7f2ax',
  type: 'sale',
  vehicleSlug: 'toyota-harrier-premium-2020',
  vehicleLabel: '2020 Toyota Harrier Premium',
  stage: 'signed',
  paymentStatus: 'unpaid',
  paymentMethod: null,
  totalAmount: 4980000,
  depositDue: 500000,
  amountPaid: 0,
  signedAt: hoursAgo(5),
  signatureName: 'Wanjiku Mwangi',
  createdAt: hoursAgo(52),
  updatedAt: hoursAgo(5),
  owner: 'Grace Njeri',
  source: 'Website enquiry',
  customer: {
    name: 'Wanjiku Mwangi',
    phone: '+254 722 145 908',
    email: 'wanjiku.mwangi@gmail.com',
    idNumber: '2884****',
    kraPin: 'A00****812P',
    address: 'Lavington, Nairobi',
    licenceNumber: 'DL-4471982',
    nextOfKin: 'Peter Mwangi · +254 720 887 441'
  },
  hire: null,
  activity: [
  { id: 'a1', at: hoursAgo(52), label: 'Enquiry received from the Harrier listing', actor: 'Website', channel: 'system' },
  { id: 'a2', at: hoursAgo(50), label: 'Payment link sent with the inspection report', actor: 'Grace Njeri', channel: 'whatsapp' },
  { id: 'a3', at: hoursAgo(28), label: 'Customer details and ID captured through the link', actor: 'Wanjiku Mwangi', channel: 'system' },
  { id: 'a4', at: hoursAgo(5), label: 'Sale agreement signed electronically', actor: 'Wanjiku Mwangi', channel: 'system' }],

  documents: [
  { id: 'doc1', name: 'Sale agreement MGH-2417', kind: 'agreement', status: 'signed', note: 'Signed 5 hours ago' },
  { id: 'doc2', name: 'National ID', kind: 'id', status: 'received' },
  { id: 'doc3', name: '121-point inspection report', kind: 'inspection', status: 'received' },
  { id: 'doc4', name: 'Deposit receipt', kind: 'receipt', status: 'awaiting' }],

  notes: 'Wants delivery to Lavington on Saturday morning. Balance through Stanbic asset finance — file already with the bank.'
},
{
  id: 'd-2419',
  ref: 'MGH-2419',
  token: 'q4m8rt',
  type: 'hire',
  vehicleSlug: 'toyota-land-cruiser-prado-tx-2019',
  vehicleLabel: '2019 Toyota Land Cruiser Prado TX',
  stage: 'details-in',
  paymentStatus: 'unpaid',
  paymentMethod: null,
  totalAmount: 232000,
  depositDue: 116000,
  amountPaid: 0,
  signedAt: null,
  signatureName: null,
  createdAt: hoursAgo(20),
  updatedAt: hoursAgo(3),
  owner: 'Amina Hassan',
  source: 'WhatsApp',
  customer: {
    name: 'Laura Bennett',
    phone: '+44 7700 900 812',
    email: 'l.bennett@outlook.com',
    idNumber: 'P-GBR ****291',
    kraPin: '—',
    address: 'Hemingways, Karen · arriving JKIA',
    licenceNumber: 'BENNE*****9LB',
    nextOfKin: 'James Bennett · +44 7700 900 455'
  },
  hire: {
    pickup: 'JKIA — Airport',
    from: '2026-09-26',
    to: '2026-10-12',
    days: 16,
    withDriver: false
  },
  activity: [
  { id: 'b1', at: hoursAgo(20), label: 'Availability question about a 16-day self-drive hire', actor: 'Laura Bennett', channel: 'whatsapp' },
  { id: 'b2', at: hoursAgo(19), label: 'Quote and payment link sent', actor: 'Amina Hassan', channel: 'whatsapp' },
  { id: 'b3', at: hoursAgo(3), label: 'Passport and UK licence uploaded through the link', actor: 'Laura Bennett', channel: 'system' }],

  documents: [
  { id: 'doc5', name: 'Hire agreement MGH-2419', kind: 'agreement', status: 'awaiting', note: 'Sent, awaiting signature' },
  { id: 'doc6', name: 'Passport', kind: 'id', status: 'received' },
  { id: 'doc7', name: 'UK driving licence', kind: 'licence', status: 'received' }],

  notes: 'Landing 23:10 on the 26th. Wants the car at arrivals with a full tank and two extra water jerricans for the Mara leg.'
},
{
  id: 'd-2420',
  ref: 'MGH-2420',
  token: 'v9x3ld',
  type: 'hire',
  vehicleSlug: 'toyota-hiace-14-seater-2021',
  vehicleLabel: '2021 Toyota Hiace 14-Seater',
  stage: 'deposit-paid',
  paymentStatus: 'paid',
  paymentMethod: 'mpesa',
  totalAmount: 91000,
  depositDue: 91000,
  amountPaid: 91000,
  signedAt: hoursAgo(26),
  signatureName: 'Daniel Otieno',
  createdAt: hoursAgo(30),
  updatedAt: hoursAgo(24),
  owner: 'Amina Hassan',
  source: 'Corporate account',
  customer: {
    name: 'Daniel Otieno',
    phone: '+254 733 284 110',
    email: 'd.otieno@fieldreach.org',
    idNumber: '2214****',
    kraPin: 'A01****455K',
    address: 'FieldReach Kenya, Upper Hill',
    licenceNumber: '—',
    nextOfKin: 'Operations desk · +254 733 284 100'
  },
  hire: {
    pickup: 'Your hotel or office',
    from: '2026-09-15',
    to: '2026-09-22',
    days: 7,
    withDriver: true
  },
  activity: [
  { id: 'c1', at: hoursAgo(30), label: 'Shuttle request for a 7-day field rotation', actor: 'Daniel Otieno', channel: 'email' },
  { id: 'c2', at: hoursAgo(29), label: 'Corporate payment link issued', actor: 'Amina Hassan', channel: 'email' },
  { id: 'c3', at: hoursAgo(26), label: 'Hire agreement signed electronically', actor: 'Daniel Otieno', channel: 'system' },
  { id: 'c4', at: hoursAgo(24), label: 'KES 91,000 received by M-Pesa · ref SJ48K2LMP1', actor: 'Payments', channel: 'system' }],

  documents: [
  { id: 'doc8', name: 'Hire agreement MGH-2420', kind: 'agreement', status: 'signed' },
  { id: 'doc9', name: 'Company PIN certificate', kind: 'id', status: 'received' },
  { id: 'doc10', name: 'M-Pesa receipt SJ48K2LMP1', kind: 'receipt', status: 'received' }],

  notes: 'PSV driver assigned: Kimani. Vehicle tracked on the fleet dashboard, geofence alert set for the Nakuru corridor.'
},
{
  id: 'd-2421',
  ref: 'MGH-2421',
  token: 'b2h6we',
  type: 'sale',
  vehicleSlug: 'toyota-land-cruiser-v8-zx-2016',
  vehicleLabel: '2016 Toyota Land Cruiser V8 ZX',
  stage: 'link-sent',
  paymentStatus: 'unpaid',
  paymentMethod: null,
  totalAmount: 11200000,
  depositDue: 1000000,
  amountPaid: 0,
  signedAt: null,
  signatureName: null,
  createdAt: hoursAgo(9),
  updatedAt: hoursAgo(8),
  owner: 'Grace Njeri',
  source: 'Referral',
  customer: {
    ...emptyCustomer,
    name: 'Hon. S. Kiptoo',
    phone: '+254 701 664 209'
  },
  hire: null,
  documents: [
  { id: 'doc11', name: 'Sale agreement MGH-2421', kind: 'agreement', status: 'awaiting' },
  { id: 'doc12', name: 'Logbook copy', kind: 'logbook', status: 'received' }],

  activity: [
  { id: 'e1', at: hoursAgo(9), label: 'Referred by Daniel Otieno, viewed the V8 at the yard', actor: 'Grace Njeri', channel: 'in-person' },
  { id: 'e2', at: hoursAgo(8), label: 'Payment link sent for a KES 1M reservation deposit', actor: 'Grace Njeri', channel: 'sms' }],

  notes: 'Wants to hold the unit until Friday. Two other enquiries on this V8 — do not extend the hold past 72 hours.'
},
{
  id: 'd-2422',
  ref: 'MGH-2422',
  token: 'n5t1cq',
  type: 'sale',
  vehicleSlug: 'mazda-demio-skyactiv-2018',
  vehicleLabel: '2018 Mazda Demio SkyActiv',
  stage: 'enquiry',
  paymentStatus: 'unpaid',
  paymentMethod: null,
  totalAmount: 1150000,
  depositDue: 150000,
  amountPaid: 0,
  signedAt: null,
  signatureName: null,
  createdAt: hoursAgo(2),
  updatedAt: hoursAgo(2),
  owner: 'Grace Njeri',
  source: 'Website enquiry',
  customer: {
    ...emptyCustomer,
    name: 'Brian Kimutai',
    phone: '+254 745 902 331',
    email: 'bkimutai@gmail.com'
  },
  hire: null,
  documents: [{ id: 'doc13', name: 'Sale agreement MGH-2422', kind: 'agreement', status: 'awaiting' }],
  activity: [
  { id: 'f1', at: hoursAgo(2), label: 'Test drive request from the Demio listing', actor: 'Website', channel: 'system' }],

  notes: 'First car. Asking about 20% deposit over 36 months — send the Family Bank rate sheet with the link.'
},
{
  id: 'd-2415',
  ref: 'MGH-2415',
  token: 'z8p4gv',
  type: 'sale',
  vehicleSlug: 'mercedes-benz-c200-avantgarde-2018',
  vehicleLabel: '2018 Mercedes-Benz C200 Avantgarde',
  stage: 'delivered',
  paymentStatus: 'paid',
  paymentMethod: 'bank',
  totalAmount: 3890000,
  depositDue: 400000,
  amountPaid: 3890000,
  signedAt: hoursAgo(120),
  signatureName: 'Faith Chemutai',
  createdAt: hoursAgo(220),
  updatedAt: hoursAgo(70),
  owner: 'Grace Njeri',
  source: 'Walk-in',
  customer: {
    name: 'Faith Chemutai',
    phone: '+254 718 330 076',
    email: 'faith.chemutai@kpmg.co.ke',
    idNumber: '3102****',
    kraPin: 'A00****119T',
    address: 'Riverside Drive, Nairobi',
    licenceNumber: 'DL-9920417',
    nextOfKin: 'Mercy Chemutai · +254 712 005 884'
  },
  hire: null,
  activity: [
  { id: 'g1', at: hoursAgo(220), label: 'Walk-in viewing at the Roysambu showroom', actor: 'Grace Njeri', channel: 'in-person' },
  { id: 'g2', at: hoursAgo(120), label: 'Sale agreement signed electronically', actor: 'Faith Chemutai', channel: 'system' },
  { id: 'g3', at: hoursAgo(96), label: 'Balance cleared by bank transfer', actor: 'Payments', channel: 'system' },
  { id: 'g4', at: hoursAgo(70), label: 'NTSA transfer completed, keys handed over', actor: 'Grace Njeri', channel: 'in-person' }],

  documents: [
  { id: 'doc14', name: 'Sale agreement MGH-2415', kind: 'agreement', status: 'signed' },
  { id: 'doc15', name: 'Transfer of ownership', kind: 'logbook', status: 'received' },
  { id: 'doc16', name: 'Final receipt', kind: 'receipt', status: 'received' }],

  notes: 'First service booked at 1,000 km. Happy to give a testimonial.'
}];


export const getDealByToken = (token: string): Deal | undefined =>
deals.find((deal) => deal.token === token);
