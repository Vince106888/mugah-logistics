const options = {};
const positional = [];
const args = process.argv.slice(2);
const defaultBase = 'https://mugahlogistics.co.ke';

if (args.length === 0) {
  console.log(`${defaultBase}/pay?amount=AMOUNT_KES&ref=REFERENCE&for=VEHICLE_OR_BOOKING`);
  process.exit(0);
}

for (let index = 0; index < args.length; index += 1) {
  const argument = args[index];
  if (!argument.startsWith('--')) {
    positional.push(argument);
    continue;
  }

  const [key, inlineValue] = argument.slice(2).split('=', 2);
  const value = inlineValue ?? args[index + 1];
  if (key && value) options[key] = value;
  if (inlineValue === undefined && value) index += 1;
}

const amount = Number(options.amount ?? positional[0]);
const reference = String(options.ref ?? positional[1] ?? '').trim().toUpperCase();
const item = String(options.item ?? positional[2] ?? '').trim();
const base = String(options.base ?? positional[3] ?? defaultBase).replace(/\/$/, '');

if (!Number.isInteger(amount) || amount <= 0 || amount > 100_000_000) {
  console.error('Usage: npm run payment-link -- 50000 MGH-2501 "Toyota Harrier reservation"');
  process.exit(1);
}
if (!/^[A-Z0-9-]{3,32}$/.test(reference)) {
  console.error('Reference must contain 3-32 letters, numbers or hyphens.');
  process.exit(1);
}

const params = new URLSearchParams({ amount: String(amount), ref: reference });
if (item) params.set('for', item.slice(0, 120));
console.log(`${base}/pay?${params.toString()}`);
