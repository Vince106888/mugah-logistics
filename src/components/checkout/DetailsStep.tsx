import { LockIcon } from 'lucide-react';
import type { CustomerRecord } from '../../types/deal';

interface DetailsStepProps {
  customer: CustomerRecord;
  onChange: (field: keyof CustomerRecord, value: string) => void;
  error: string;
}

const fields: {
  field: keyof CustomerRecord;
  label: string;
  placeholder?: string;
  optional?: boolean;
  span?: boolean;
  mode?: 'tel' | 'email';
}[] = [
{ field: 'name', label: 'Full name as it appears on your ID' },
{ field: 'phone', label: 'Mobile number', placeholder: '+254…', mode: 'tel' },
{ field: 'email', label: 'Email', mode: 'email' },
{ field: 'idNumber', label: 'National ID or passport number' },
{ field: 'kraPin', label: 'KRA PIN', optional: true },
{ field: 'licenceNumber', label: 'Driving licence number', optional: true },
{ field: 'address', label: 'Physical address', span: true },
{ field: 'nextOfKin', label: 'Next of kin — name and phone', span: true }];


export function DetailsStep({ customer, onChange, error }: DetailsStepProps) {
  return (
    <div>
      <h2 className="font-display text-3xl tracking-tight text-ink">Your details</h2>
      <p className="mt-2 text-sm text-ink-600">
        This replaces the forms you would otherwise fill at the yard. It takes about two minutes and
        we only ask for what the transfer and insurance require.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {fields.map((item) =>
        <label key={item.field} className={`block ${item.span ? 'sm:col-span-2' : ''}`}>
            <span className="mb-2 block text-sm font-medium text-ink">
              {item.label}{' '}
              {item.optional && <span className="font-normal text-ink-600">(optional)</span>}
            </span>
            <input
            value={customer[item.field]}
            onChange={(event) => onChange(item.field, event.target.value)}
            placeholder={item.placeholder}
            inputMode={item.mode === 'tel' ? 'tel' : undefined}
            type={item.mode === 'email' ? 'email' : 'text'}
            className="h-11 w-full rounded-lg border border-bone-line bg-bone px-3 text-sm text-ink focus:border-forest focus:outline-none" />
          
          </label>
        )}
      </div>

      {error &&
      <p className="mt-5 text-sm font-medium text-amber" role="alert">
          {error}
        </p>
      }

      <p className="mt-6 flex items-start gap-2.5 rounded-lg bg-bone-dim px-4 py-3 text-xs leading-relaxed text-ink-600">
        <LockIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest" aria-hidden="true" />
        Stored under Kenya’s Data Protection Act 2019, used only for this transaction, and never
        shared with third parties beyond NTSA and your insurer.
      </p>
    </div>);

}
