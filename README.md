# On3ra — Full SaaS App

Marketing site + email/password auth + dashboard + Paystack billing, built with Next.js and Supabase.

## What's included
- Marketing site as separate pages: Home, Product, Pricing, About, FAQ, Contact
- Sign up / sign in with email + password (Supabase Auth)
- Protected dashboard that shows subscription status
- Checkout via **Paystack** (accepts naira cards, bank transfer, USSD, and international cards)
- A webhook that records successful payments in your database automatically

## 1. Install dependencies
```
npm install
```

## 2. Create a Supabase project (free)
1. Go to https://supabase.com → New project.
2. Once created, go to **SQL Editor** → paste the contents of `supabase/schema.sql` → Run.
3. Go to **Settings → API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret, never expose to the browser)

## 3. Set up Paystack
1. Go to https://paystack.com and sign up (or log in if you already have an account).
2. Go to **Settings → API Keys & Webhooks**. Copy your **Secret key** and **Public key** into `.env.local`.
3. Once deployed (step 6), come back and set the webhook URL to `https://yourdomain.com/api/paystack/webhook`.
4. Pricing is set directly in `lib/paystack.js` (`PAYSTACK_PLAN_AMOUNTS_KOBO`) — update the amounts there if your pricing changes. Paystack expects amounts in kobo (₦1 = 100 kobo).

## 4. Create your local environment file
```
cp .env.example .env.local
```
Fill in every value from steps 2–3.

## 5. Run it locally
```
npm run dev
```
Visit http://localhost:3000. Sign up for an account, then try a pricing plan (Paystack gives you test card numbers in their docs while your `sk_test_...` key is active).

## 6. Deploy
The easiest path is **Vercel** (free tier):
1. Push this project to a GitHub repo.
2. Go to https://vercel.com → New Project → import the repo.
3. Add all the same environment variables from `.env.local` in Vercel's project settings.
4. Deploy. Update `NEXT_PUBLIC_SITE_URL` to your real domain, then go back to Paystack and set the webhook URL to point at it.

## Notes & next steps
- The contact form on the Contact page currently just shows a confirmation message — it doesn't send you an email yet. To receive submissions, wire `components/ContactForm.jsx` to an email API (e.g. Resend or Postmark) via a new `/api/contact` route.
- The dashboard currently shows subscription status only. The Projects/Content/Analytics/Sites sections in the sidebar are placeholders — that's the actual product functionality you'd build out next, one module at a time.
- Testimonial and stats sections use placeholder content — swap in real numbers and quotes once you have them.
- Logo: `public/logo.png` was cropped from your uploaded mockup photo. For best quality (crisp edges, transparent background), ask your designer for the original vector/PNG file and swap it in.
- Once you're ready to go live for real, switch your Paystack keys from test (`sk_test_...`) to live (`sk_live_...`) mode in both Paystack and your `.env.local` / Vercel settings.
