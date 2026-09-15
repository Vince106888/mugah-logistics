const options = {};
for (let index = 2; index < process.argv.length; index += 2) {
  const key = process.argv[index]?.replace(/^--/, '');
  const value = process.argv[index + 1];
  if (key && value) options[key] = value;
}

const amount = Number(options.amount);
const reference = String(options.ref ?? '').trim().toUpperCase();
const item = String(options.item ?? '').trim();
const base = String(options.base ?? 'https://mugahlogistics.co.ke').replace(/\/$/, '');

if (!Number.isInteger(amount) || amount <= 0 || amount > 100_000_000) {
  console.error('Provide a whole-number KES amount: --amount 50000');
  process.exit(1);
}
if (!/^[A-Z0-9-]{3,32}$/.test(reference)) {
  console.error('Provide a 3-32 character reference using letters, numbers or hyphens: --ref MGH-2501');
  process.exit(1);
}

const params = new URLSearchParams({ amount: String(amount), ref: reference });
if (item) params.set('for', item.slice(0, 120));
console.log(`${base}/pay?${params.toString()}`);
