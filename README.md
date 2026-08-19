# GulfCoast Labs

GulfCoast Labs is a Vite and React operator-studio site with routed work, services, labs, and contact surfaces.

## Production status

The repository is connected to Vercel and has a `READY` production deployment. The latest seven-day Vercel runtime audit found no grouped runtime errors.

The contact form submits to the serverless `/api/contact` endpoint. Submission failures remain visible and retryable in the current browser session; the form no longer clears failed inquiries or stores lead data in browser persistence.

## Stack

- Vite
- React
- Tailwind CSS v4
- React Router
- Vercel serverless contact endpoint
- Resend-compatible email delivery

## Pages

- `/`
- `/work`
- `/work/:slug`
- `/services`
- `/labs`
- `/contact`

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

There is currently no lint, unit-test, or end-to-end test script in `package.json`. The production bundle is therefore the repository's automated validation boundary until a test suite is added.

## Architecture

- `src/main.jsx`: application entry point
- `src/App.jsx`: route and page composition
- `src/components/`: shared layout, section, and contact-form UI
- `src/data.js`: site content data
- `src/styles.css`: application styling
- `api/contact.js`: serverless contact handler and Resend integration
- `vercel.json`: SPA fallback rewrites and API routing

## Contact backend

The contact form posts to `/api/contact`.

Email delivery requires these Vercel environment variables:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

If the endpoint is unavailable or misconfigured, the UI reports the failure and leaves the form contents intact so the visitor can retry. It does not claim the inquiry was sent or persist unsent lead data in the browser.

## Deployment

The repository is already connected to a Vercel production project. Before treating lead capture as fully launch-verified, submit one real production inquiry and confirm delivery to `CONTACT_TO_EMAIL` with the deployed Resend configuration.

## Ownership notes

- GulfCoast Labs is the operator brand.
- ZeroChill Co. is client work for Danny Ford.
- Vestra Intel and Lifepvth are owned brands/projects.

## Current launch gate

- [x] Vercel production deployment is `READY`
- [x] No grouped Vercel runtime errors observed in the latest seven-day audit window
- [x] Contact failures are explicit and retryable
- [ ] Confirm one production contact submission reaches the configured inbox
