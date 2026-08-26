# GulfCoast Labs

GulfCoast Labs is a Vite and React operator-studio site with routed work, services, labs, and contact surfaces.

## Production status

The repository is connected to Vercel and has a `READY` production deployment. The latest seven-day Vercel runtime audit found no grouped runtime errors.

The contact form submits to the serverless `/api/contact` endpoint. Submission failures remain visible and retryable in the current browser session; the form does not clear failed inquiries or store lead data in browser persistence.

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

## Validation

```bash
npm test
npm run build
npm run check
```

`npm test` uses Node's built-in test runner for contact-endpoint regression coverage. `npm run check` runs those tests and then creates the production Vite bundle; CI uses that combined release gate.

The contact tests cover HTML escaping, field-length enforcement, invalid email rejection, unsupported HTTP methods, and explicit failure when the production email backend is not configured.

## Architecture

- `src/main.jsx`: application entry point
- `src/App.jsx`: route and page composition
- `src/components/`: shared layout, section, and contact-form UI
- `src/data.js`: site content data
- `src/styles.css`: application styling
- `api/contact.js`: validated serverless contact handler and Resend integration
- `tests/contact.test.mjs`: contact-handler regression tests
- `vercel.json`: SPA fallback rewrites and API routing

## Contact backend

The contact form posts to `/api/contact`.

Email delivery requires these Vercel environment variables:

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

The endpoint validates required values and email format, bounds input/request sizes, escapes visitor-provided values before rendering the HTML notification, and bounds the outbound Resend request with a timeout. Delivery and configuration failures return explicit non-success states so the UI can keep the inquiry available for retry.

## Deployment

The repository is already connected to a Vercel production project. Before treating lead capture as fully launch-verified, submit one real production inquiry and confirm delivery to `CONTACT_TO_EMAIL` with the deployed Resend configuration.

## Ownership notes

- GulfCoast Labs is the operator brand.
- ZeroChill Co. is client work.
- Vestra Intel and Lifepvth are owned brands/projects.

## Current launch gate

- [x] Vercel production deployment is `READY`
- [x] No grouped Vercel runtime errors observed in the latest seven-day audit window
- [x] Contact failures are explicit and retryable
- [x] Contact input validation and HTML escaping are implemented
- [x] Contact regression tests are part of CI
- [ ] Confirm one production contact submission reaches the configured inbox
