# GulfCoast Labs

Premium operator studio site for GulfCoast Labs.

## Stack

- Vite
- React
- Tailwind CSS v4
- React Router
- Vercel-friendly serverless contact endpoint
- No TypeScript
- No Docker
- No Playwright

## Pages

- `/`
- `/work`
- `/work/:slug`
- `/services`
- `/labs`
- `/contact`

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Contact Backend

The contact form posts to `/api/contact` first.

Email delivery is configured through Vercel environment variables:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

If the endpoint is unavailable, the form falls back to `localStorage` so inquiries are preserved during development.

## Ownership Notes

- GulfCoast Labs is the operator brand.
- ZeroChill Co. is client work for Danny Ford.
- Vestra Intel and Lifepvth are owned brands/projects.
