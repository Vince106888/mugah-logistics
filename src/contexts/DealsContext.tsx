import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { deals as seedDeals } from '../data/deals';
import type {
  CustomerRecord,
  Deal,
  DealActivity,
  DealStage,
  PaymentMethod } from
'../types/deal';

export interface NewDealInput {
  type: Deal['type'];
  vehicleSlug: string;
  vehicleLabel: string;
  customerName: string;
  phone: string;
  totalAmount: number;
  depositDue: number;
  owner: string;
  notes: string;
}

interface DealsContextValue {
  deals: Deal[];
  createDeal: (input: NewDealInput) => Deal;
  getDeal: (id: string) => Deal | undefined;
  getDealByToken: (token: string) => Deal | undefined;
  saveCustomer: (token: string, customer: CustomerRecord) => void;
  signAgreement: (token: string, signatureName: string) => void;
  recordPayment: (token: string, method: PaymentMethod, amount: number) => void;
  setStage: (id: string, stage: DealStage) => void;
  logActivity: (id: string, label: string, actor: string, channel?: DealActivity['channel']) => void;
}

const DealsContext = createContext<DealsContextValue | undefined>(undefined);

let activityId = 1000;
const nextActivity = (
label: string,
actor: string,
channel: DealActivity['channel'] = 'system')
: DealActivity => {
  activityId += 1;
  return { id: `live-${activityId}`, at: new Date().toISOString(), label, actor, channel };
};

export function DealsProvider({ children }: {children: React.ReactNode;}) {
  const [deals, setDeals] = useState<Deal[]>(seedDeals);

  const patchDeal = useCallback((matcher: (deal: Deal) => boolean, patch: (deal: Deal) => Deal) => {
    setDeals((current) => current.map((deal) => matcher(deal) ? patch(deal) : deal));
  }, []);

  const createDeal = useCallback((input: NewDealInput) => {
    const serial = 2423 + Math.floor(Math.random() * 70);
    const token = Math.random().toString(36).slice(2, 8);
    const now = new Date().toISOString();
    const deal: Deal = {
      id: `d-${serial}`,
      ref: `MGH-${serial}`,
      token,
      type: input.type,
      vehicleSlug: input.vehicleSlug,
      vehicleLabel: input.vehicleLabel,
      stage: 'link-sent',
      paymentStatus: 'unpaid',
      paymentMethod: null,
      totalAmount: input.totalAmount,
      depositDue: input.depositDue,
      amountPaid: 0,
      signedAt: null,
      signatureName: null,
      createdAt: now,
      updatedAt: now,
      owner: input.owner,
      source: 'WhatsApp',
      customer: {
        name: input.customerName,
        phone: input.phone,
        email: '',
        idNumber: '',
        kraPin: '',
        address: '',
        licenceNumber: '',
        nextOfKin: ''
      },
      hire: null,
      activity: [
      nextActivity(
        `Payment link created for a KES ${input.depositDue.toLocaleString('en-KE')} deposit`,
        input.owner,
        'whatsapp'
      )],

      documents: [
      {
        id: `agr-${serial}`,
        name: `${input.type === 'hire' ? 'Hire' : 'Sale'} agreement MGH-${serial}`,
        kind: 'agreement',
        status: 'awaiting'
      }],

      notes: input.notes
    };
    setDeals((current) => [deal, ...current]);
    return deal;
  }, []);

  const getDeal = useCallback((id: string) => deals.find((deal) => deal.id === id), [deals]);

  const getDealByToken = useCallback(
    (token: string) => deals.find((deal) => deal.token === token),
    [deals]
  );

  const saveCustomer = useCallback(
    (token: string, customer: CustomerRecord) => {
      patchDeal(
        (deal) => deal.token === token,
        (deal) => ({
          ...deal,
          customer,
          stage: deal.stage === 'enquiry' || deal.stage === 'link-sent' ? 'details-in' : deal.stage,
          updatedAt: new Date().toISOString(),
          documents: deal.documents.map((doc) =>
          doc.kind === 'id' ? { ...doc, status: 'received' as const } : doc
          ),
          activity: [
          ...deal.activity,
          nextActivity('Customer details captured through the payment link', customer.name)]

        })
      );
    },
    [patchDeal]
  );

  const signAgreement = useCallback(
    (token: string, signatureName: string) => {
      patchDeal(
        (deal) => deal.token === token,
        (deal) => ({
          ...deal,
          stage: deal.stage === 'deposit-paid' || deal.stage === 'delivered' ? deal.stage : 'signed',
          signedAt: new Date().toISOString(),
          signatureName,
          updatedAt: new Date().toISOString(),
          documents: deal.documents.map((doc) =>
          doc.kind === 'agreement' ?
          { ...doc, status: 'signed' as const, note: 'Signed just now' } :
          doc
          ),
          activity: [
          ...deal.activity,
          nextActivity(`${deal.type === 'hire' ? 'Hire' : 'Sale'} agreement signed electronically`, signatureName)]

        })
      );
    },
    [patchDeal]
  );

  const recordPayment = useCallback(
    (token: string, method: PaymentMethod, amount: number) => {
      const methodLabel =
      method === 'mpesa' ? 'M-Pesa' : method === 'card' ? 'card' : 'bank transfer';
      patchDeal(
        (deal) => deal.token === token,
        (deal) => {
          const amountPaid = deal.amountPaid + amount;
          return {
            ...deal,
            paymentMethod: method,
            amountPaid,
            paymentStatus: amountPaid >= deal.totalAmount ? 'paid' : 'partial',
            stage: deal.stage === 'delivered' ? deal.stage : 'deposit-paid',
            updatedAt: new Date().toISOString(),
            documents: deal.documents.some((doc) => doc.kind === 'receipt') ?
            deal.documents.map((doc) =>
            doc.kind === 'receipt' ? { ...doc, status: 'received' as const } : doc
            ) :
            [
            ...deal.documents,
            {
              id: `receipt-${deal.id}`,
              name: `Deposit receipt ${deal.ref}`,
              kind: 'receipt' as const,
              status: 'received' as const
            }],

            activity: [
            ...deal.activity,
            nextActivity(
              `KES ${amount.toLocaleString('en-KE')} received by ${methodLabel}`,
              'Payments'
            )]

          };
        }
      );
    },
    [patchDeal]
  );

  const setStage = useCallback(
    (id: string, stage: DealStage) => {
      patchDeal(
        (deal) => deal.id === id,
        (deal) => ({
          ...deal,
          stage,
          updatedAt: new Date().toISOString(),
          activity: [...deal.activity, nextActivity(`Stage moved to ${stage}`, deal.owner)]
        })
      );
    },
    [patchDeal]
  );

  const logActivity = useCallback(
    (id: string, label: string, actor: string, channel: DealActivity['channel'] = 'system') => {
      patchDeal(
        (deal) => deal.id === id,
        (deal) => ({
          ...deal,
          stage: deal.stage === 'enquiry' ? 'link-sent' : deal.stage,
          updatedAt: new Date().toISOString(),
          activity: [...deal.activity, nextActivity(label, actor, channel)]
        })
      );
    },
    [patchDeal]
  );

  const value = useMemo(
    () => ({
      deals,
      createDeal,
      getDeal,
      getDealByToken,
      saveCustomer,
      signAgreement,
      recordPayment,
      setStage,
      logActivity
    }),
    [
    deals,
    createDeal,
    getDeal,
    getDealByToken,
    saveCustomer,
    signAgreement,
    recordPayment,
    setStage,
    logActivity]

  );

  return <DealsContext.Provider value={value}>{children}</DealsContext.Provider>;
}

export function useDeals(): DealsContextValue {
  const context = useContext(DealsContext);
  if (!context) {
    throw new Error('useDeals must be used inside a DealsProvider');
  }
  return context;
}