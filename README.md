This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Note: API Routes and static export

This project currently sets `output: "export"` in `next.config.mjs` which creates a static HTML export. Next.js API Routes (files under `pages/api` or `src/pages/api`) cannot be used with a static export. If you need server-side endpoints (for example, to send email from a contact form) you have three options:

- Host the API as an external serverless function (AWS Lambda, Vercel serverless functions, Netlify functions, etc.) and set `NEXT_PUBLIC_SENDMAIL_URL` to that endpoint. The contact form has been updated to use `NEXT_PUBLIC_SENDMAIL_URL` if present and will fall back to `/api/sendMail` locally.
- Remove `output: "export"` from `next.config.mjs` and build/run a standard Next.js server build (not static export), which supports API routes.
- Use a third-party form service (Formspree, Netlify Forms, Zapier, etc.) that accepts client-side submissions.

Recommended: if you need static hosting (S3/CloudFront) and email sending, deploy a small serverless endpoint separately and point `NEXT_PUBLIC_SENDMAIL_URL` at it. This keeps the site statically exported while preserving backend functionality.

## Contact form / Postmark setup

If you want contact form submissions to be delivered via Postmark, set the following environment variables in your deployment or local `.env`:

- `POSTMARK_API_TOKEN` - your Postmark server API token (required)
- `POSTMARK_FROM` - from email address (should be verified in Postmark)
- `CONTACT_RECIPIENTS` - comma-separated list of recipient emails (e.g. `team@example.com,ops@example.com`)

An `.env.example` has been added to the repo with the required keys. The API route `src/pages/api/sendMail.js` will prefer these values. If you deploy the API as an external serverless function, set `NEXT_PUBLIC_SENDMAIL_URL` to the function URL so the client posts there.
