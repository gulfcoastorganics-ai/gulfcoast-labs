# GulfCoast Labs

GulfCoast Labs is a Vite and React operator-studio site with routed work, services, labs, and contact surfaces.

## Stack

- Vite
- React
- Tailwind CSS v4
- React Router
- Vercel-friendly serverless contact endpoint
- No TypeScript

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

The development server uses Vite. No public live URL is currently configured in the repository metadata.

## Build

```bash
npm run build
```

There is currently no lint, unit-test, or end-to-end test script in `package.json`. Validation for this repository is currently limited to the production build command.

## Architecture

- `src/main.jsx`: application entry point
- `src/App.jsx`: route and page composition
- `src/components/`: shared layout, section, and contact-form UI
- `src/data.js`: site content data
- `src/styles.css`: application styling
- `api/contact.js`: serverless contact handler and Resend integration
- `vercel.json`: SPA fallback rewrites and API routing

## Contact Backend

The contact form posts to `/api/contact` first.

Email delivery is configured through Vercel environment variables:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

If the endpoint is unavailable, the form falls back to `localStorage` so inquiries are preserved during development.

The contact endpoint requires `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` in the deployment environment. Without them, it returns a configuration-missing response rather than attempting delivery.

## Deployment

The repository includes `vercel.json` rewrites for the SPA and `/api/contact`. Connect the repository to Vercel, configure the contact environment variables, and run `npm run build` before deployment. No verified public deployment URL is documented yet.

## Ownership Notes

- GulfCoast Labs is the operator brand.
- ZeroChill Co. is client work for Danny Ford.
- Vestra Intel and Lifepvth are owned brands/projects.
