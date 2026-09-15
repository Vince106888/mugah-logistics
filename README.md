# Mugah Logistics website

A responsive React and TypeScript website for Mugah Logistics, built with Vite and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

Run the complete quality gate before deploying:

```bash
npm run check
```

## Production build

```bash
npm run build
npm run preview
```

The static output is written to `dist/`. Deploy that directory to any static host. Netlify and Vercel configuration files are included with single-page-app route fallbacks. The primary domain in the SEO files is `https://mugahlogistics.co.ke`; update `src/config.ts`, `index.html`, `public/robots.txt`, and `public/sitemap.xml` if the production domain differs.

## Enquiries and payments

The public build sends prepared enquiries through WhatsApp or the visitor's email client, so it works without a server while keeping submission explicit.

M-Pesa payment links use manual **Send Money** instructions for `0716 376 584`. Generate a link with an agreed amount, reference and description:

```bash
npm run payment-link -- 50000 MGH-2501 "Toyota Harrier reservation"
```

The generated URL opens `/pay`, displays the fixed recipient number, and lets the customer return their 10-character transaction code through WhatsApp. The team must verify that code against the recipient's M-Pesa statement before marking a deal paid. The website never asks for an M-Pesa PIN and cannot initiate or automatically confirm a transfer.

Automated STK Push requires a Safaricom Business Shortcode or Till, a Daraja consumer key and secret, an LNM passkey, and a public callback endpoint. A normal mobile number cannot use Daraja's STK Push API.

The extracted prototype also included an in-memory staff console and simulated checkout. These are disabled by default because they do not authenticate users, persist data, generate documents, or process real payments. For an internal product demo only, copy `.env.example` to `.env.local`, set `VITE_ENABLE_DEMO_FEATURES=true`, and restart Vite. Do not enable that flag on a public deployment.

Before launch, confirm the business phone number, email address, physical locations, prices, registration claims, testimonials and legal wording in `src/data/site.ts` and `src/data/vehicles.ts`.
