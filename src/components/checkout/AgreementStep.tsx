import { ShieldCheckIcon } from 'lucide-react';
import type { Deal } from '../../types/deal';
import { SignaturePad } from './SignaturePad';
import { formatKES } from '../../utils/format';

interface AgreementStepProps {
  deal: Deal;
  signatureName: string;
  onSignatureNameChange: (value: string) => void;
  agreed: boolean;
  onAgreedChange: (value: boolean) => void;
  onSignatureChange: (hasSignature: boolean) => void;
  error: string;
}

export function AgreementStep({
  deal,
  signatureName,
  onSignatureNameChange,
  agreed,
  onAgreedChange,
  onSignatureChange,
  error
}: AgreementStepProps) {
  const isHire = deal.type === 'hire';

  const clauses = isHire ?
  [
  `The hirer takes the ${deal.vehicleLabel} for ${deal.hire?.days ?? 1} day(s) from ${deal.hire?.from ?? 'the agreed date'}, collected at ${deal.hire?.pickup ?? 'the agreed point'}.`,
  'Comprehensive insurance is included. The hirer remains liable for the excess of KES 50,000 in the event of an at-fault incident.',
  'Included mileage is 150 km per day in town and 250 km per day upcountry. Additional kilometres are charged at KES 35 each.',
  'The vehicle is returned with a like-for-like fuel level. No refuelling service fee is charged.',
  'The vehicle may not leave Kenya without written authority and a COMESA yellow card arranged by Mugah Logistics.',
  'A refundable security deposit is held and released within 48 hours of the return inspection.'] :

  [
  `Mugah Logistics Ltd sells the ${deal.vehicleLabel} to the buyer for ${formatKES(deal.totalAmount)}, sold as inspected.`,
  `A reservation deposit of ${formatKES(deal.depositDue)} holds the vehicle for 72 hours and is credited in full against the purchase price.`,
  'The 121-point inspection report attached to this agreement forms part of the sale. Any defect disclosed there is accepted by the buyer.',
  'Transfer of ownership is lodged with NTSA by Mugah Logistics within two working days of full settlement.',
  'The balance is payable in cash, by bank transfer, or through an approved asset finance facility before release of the vehicle.',
  'The first service at 1,000 km is provided free of charge at our Roysambu, Thika Road workshop.'];


  return (
    <div>
      <h2 className="font-display text-3xl tracking-tight text-ink">
        {isHire ? 'Hire agreement' : 'Sale agreement'} {deal.ref}
      </h2>
      <p className="mt-2 text-sm text-ink-600">
        Read it, then sign below. You will get a countersigned PDF by email and WhatsApp immediately
        afterwards.
      </p>

      <div className="mt-6 max-h-72 overflow-y-auto rounded-xl border border-bone-line bg-white p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-600">
          Between Mugah Logistics Ltd and {deal.customer.name || 'the customer'}
        </p>
        <ol className="mt-4 space-y-4 text-sm leading-relaxed text-ink-600">
          {clauses.map((clause, index) =>
          <li key={clause} className="flex gap-3">
              <span className="shrink-0 font-semibold text-ink">{index + 1}.</span>
              <span>{clause}</span>
            </li>
          )}
        </ol>
        <p className="mt-5 border-t border-bone-line pt-4 text-xs text-ink-600">
          Governed by the laws of Kenya. Executed electronically under the Kenya Information and
          Communications Act, which gives this signature the same standing as ink on paper.
        </p>
      </div>

      <div className="mt-7">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">
            Type your full name to confirm you are the signatory
          </span>
          <input
            value={signatureName}
            onChange={(event) => onSignatureNameChange(event.target.value)}
            className="h-11 w-full max-w-sm rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none" />
          
        </label>

        <div className="mt-5">
          <span className="mb-2 block text-sm font-medium text-ink">Draw your signature</span>
          <SignaturePad onChange={onSignatureChange} />
        </div>

        <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-ink">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(event) => onAgreedChange(event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-bone-line text-forest focus:ring-forest" />
          
          <span>
            I have read the {isHire ? 'hire' : 'sale'} agreement and the inspection report, and I
            agree to be bound by them.
          </span>
        </label>

        {error &&
        <p className="mt-4 text-sm font-medium text-amber" role="alert">
            {error}
          </p>
        }

        <p className="mt-6 flex items-start gap-2.5 rounded-lg bg-forest-pale px-4 py-3 text-xs leading-relaxed text-ink-600">
          <ShieldCheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest" aria-hidden="true" />
          We record the signing time, your device and IP address as an audit trail. Nothing is
          charged by signing — payment is the next step and you choose the amount method.
        </p>
      </div>
    </div>);

}
