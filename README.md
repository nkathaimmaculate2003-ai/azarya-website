# Azarya Justice and Mediation Hub — Website

The informational website for **Azarya Justice and Mediation Hub**, a community-based organisation in Kasarani, Off Seasons Road, Nairobi, Kenya.

Built with Next.js 16 (App Router), TypeScript and Tailwind CSS 4. It has no database or CMS: all content lives in plain TypeScript files that are easy to edit.

---

## 1. Prerequisites

- **Node.js** 20.9 or newer (`node --version`)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)
- A code editor such as **VS Code**

## 2. Local setup

```bash
npm install
```

Copy the example environment file:

```bash
copy .env.example .env.local
```

(`cp .env.example .env.local` on macOS/Linux.)

To test the contact form locally without an email provider, set `CONTACT_DEV_LOG_ONLY=true` in `.env.local`. Submissions are then printed in the terminal instead of being emailed, and the form says so.

## 3. Commands

| Task | Command |
| --- | --- |
| Start the development server at http://localhost:3000 | `npm run dev` |
| Check code quality (lint) | `npm run lint` |
| Type-check | `npx tsc --noEmit` |
| Production build | `npm run build` |
| Run the production build locally | `npm run start` |

## 4. Environment variables

See [.env.example](.env.example). Never commit real values.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | Public address, e.g. `https://www.azarya.example`. Used for canonical URLs, sitemap and social tags. |
| `RESEND_API_KEY` | Yes (production) | API key for [Resend](https://resend.com), the email service that delivers form enquiries. Server-side only. |
| `CONTACT_TO_EMAIL` | Yes (production) | Inbox that receives enquiries (comma-separate for several). |
| `CONTACT_FROM_EMAIL` | Yes (production) | Sender address on a domain verified in Resend. |
| `GOOGLE_SITE_VERIFICATION` | No | Google Search Console verification code (the `content="..."` value of its HTML tag). Not needed if you verify by DNS. |
| `CONTACT_DEV_LOG_ONLY` | No | `true` prints submissions to the terminal during local development. Ignored in production. |

If the email variables are missing in production, the form shows an error and tells visitors to phone or email instead. **It never claims a message was sent unless the server confirms delivery.**

## 5. Deployment (Vercel)

1. Push this folder to a GitHub, GitLab or Bitbucket repository (private is fine).
2. Sign in at [vercel.com](https://vercel.com), click **Add New → Project** and import the repository. Vercel detects Next.js automatically.
3. Under **Settings → Environment Variables**, add the variables from section 4.
4. Click **Deploy**. Vercel provides HTTPS automatically.
5. Under **Settings → Domains**, connect the organisation's custom domain, then update `NEXT_PUBLIC_SITE_URL` to match and redeploy.
6. In [Resend](https://resend.com), verify the sending domain (DNS records) so emails are delivered reliably.
7. Set up [Google Search Console](https://search.google.com/search-console) for the domain and submit `https://<your-domain>/sitemap.xml`.

**Other hosts:** any host that runs Node.js 20.9+ works. Run `npm run build`, then `npm run start`, behind HTTPS.

## 6. Where to update content

All editable content lives in `src/content/`. Each file has comments at the top explaining what to change.

| What to change | File |
| --- | --- |
| Organisation name, phone, email, location, map link, WhatsApp, opening hours, response time, social links, navigation, disclaimer and safety text | [src/content/site.ts](src/content/site.ts) |
| The six service descriptions | [src/content/services.ts](src/content/services.ts) |
| Resource articles and FAQs | [src/content/resources.ts](src/content/resources.ts) |
| Community programmes (planned / ongoing / completed) | [src/content/programmes.ts](src/content/programmes.ts) |
| Mission, vision, values, objectives | [src/app/about/page.tsx](src/app/about/page.tsx) |
| Mediation steps, benefits, limitations | [src/app/mediation-explained/page.tsx](src/app/mediation-explained/page.tsx) |
| Privacy notice | [src/app/privacy-notice/page.tsx](src/app/privacy-notice/page.tsx) |
| Brand colours and fonts | [src/app/globals.css](src/app/globals.css) and [src/app/layout.tsx](src/app/layout.tsx) |
| Logo, hero photos and browser-tab icon | Put the original files in `Assets/` (same names), then run `node scripts/optimize-images.mjs` |
| Hero slideshow photo descriptions (alt text) | `heroSlides` in [src/app/page.tsx](src/app/page.tsx) |

**Adding an article:** copy an existing entry in `resources.ts`, give it a new unique `slug`, and set the `published` and `reviewed` dates. It appears automatically on the resources page, gets its own page at `/legal-awareness/<slug>` and is added to the sitemap.

**Adding a programme:** add an entry in `programmes.ts` with an honest `status`. Never mark something `completed` unless it took place.

**Optional details:** WhatsApp, opening hours and response time are hidden while their value in `site.ts` is `null`. Set `whatsappUrl`, `openingHours` or `responseTime` and they appear on the Contact page automatically.

**Adding a page:** create `src/app/<page-name>/page.tsx`, export `metadata` using `pageMetadata(...)`, add the link to `mainNav` or `footerLegalNav` in `site.ts`, and add the path to [src/app/sitemap.ts](src/app/sitemap.ts).

## 7. Project structure

```
src/
  app/                        Pages (each folder = one URL)
    page.tsx                  Home  /
    about/                    /about
    services/                 /services
    mediation-explained/      /mediation-explained
    legal-awareness/          /legal-awareness  (+ [slug]/ for articles)
    community-programmes/     /community-programmes
    partner-with-us/          /partner-with-us
    contact/                  /contact
    privacy-notice/           /privacy-notice
    disclaimer/               /disclaimer
    not-found.tsx             Custom 404 page
    api/contact/route.ts      Contact form endpoint (server-side validation, spam checks)
    sitemap.ts, robots.ts     /sitemap.xml and /robots.txt
    opengraph-image.tsx       Social sharing image
    icon.png, apple-icon.png  Browser tab and home-screen icons (generated from the logo)
    layout.tsx, globals.css   Site-wide layout, metadata, fonts and colours
  components/                 Reusable UI (header, footer, form, cards, notices)
  content/                    Editable site content (see section 6)
  lib/                        Form validation, email sending, rate limiting, helpers
public/
  logo.png, images/hero/      Optimised logo and hero photos (generated, don't edit by hand)
Assets/                       Original, full-size logo and photos
scripts/optimize-images.mjs   Turns the originals in Assets/ into the optimised files
```

## 8. Security, privacy and accessibility notes

- **Secrets** are read only on the server (`src/lib/send-enquiry.ts`, marked `server-only`). Nothing secret is prefixed `NEXT_PUBLIC_`.
- **Contact form:** collects minimal data, warns users not to send confidential details, validates in the browser *and* on the server, and checks the request origin and body size.
- **Spam protection:** a hidden honeypot field, a minimum fill time and a per-IP rate limit (5 messages per 10 minutes). The rate limit is in memory, so on serverless hosts it is a basic measure only. For stronger protection, add [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) (free, privacy-friendly) or a shared store such as Upstash Redis.
- **No trackers or analytics** are installed. Fonts are self-hosted at build time, so visitors' browsers don't contact Google.
- **Accessibility:** skip link, keyboard-operable menu (Escape closes it), visible focus rings, one H1 per page, labelled form fields with announced errors and status, links underlined so they don't rely on colour alone, and reduced-motion support. Test with a screen reader and with keyboard only before launch.

## 9. Analytics and Meta Pixel (not installed)

No analytics or advertising trackers are included. If the organisation later decides to add one:

1. **Decide whether it is needed.** Prefer privacy-conscious analytics (e.g. Plausible, or Vercel Web Analytics, which is cookieless) over advertising pixels.
2. **Consent first.** Kenya's Data Protection Act, 2019 applies to personal data. Advertising trackers such as the Meta Pixel set cookies and share browsing data with third parties, so add a consent banner that blocks the tracker until the visitor opts in. Get professional advice on the organisation's obligations.
3. **Never send enquiry content.** Do not fire pixel events containing form fields, and do not track the contact page in a way that could reveal that someone sought help with a sensitive matter.
4. **Update the privacy notice** to name the tool, what it collects, why and how to opt out.
5. **Technical steps (Meta Pixel):** create a Pixel in Meta Events Manager, store its ID as `NEXT_PUBLIC_META_PIXEL_ID`, load it with `next/script` in `src/app/layout.tsx` *only after consent is given*, and use the generic `PageView` event only.

## 10. Before-launch checklist

**Facts the organisation should confirm** (the site leaves these out or uses general wording until they are added):

- [ ] Approve final mission and vision wording (About page)
- [ ] Approve all public-facing copy, including service descriptions, articles and FAQs
- [ ] Whether 0705 423 690 is also a WhatsApp number (set `whatsappUrl` in `site.ts`)
- [ ] Whether `azaryajusticeandmediationhub@gmail.com` is the long-term official email (a domain email such as `info@<domain>` looks more credible)
- [ ] Opening days and hours, if publishing them
- [ ] Expected response time for enquiries
- [ ] Exact map pin / Google Maps share link (set `mapUrl` in `site.ts`)
- [ ] Confirm the logo is final, and update the social-sharing image (`src/app/opengraph-image.tsx`) to match if wanted
- [ ] Confirm the organisation has the right to use the three hero photos, and that they are not presented as photos of Azarya's own activities. If they show real people, make sure those people have given permission
- [ ] Public registration details, if applicable (About page)
- [ ] Official social media links (set `social` in `site.ts`)
- [ ] Whether appointments are required and whether any services have fees
- [ ] Languages the organisation can reliably support
- [ ] Verified emergency, protection and support contacts for Kenya (Contact and Resources pages). Do not publish any hotline number until it has been checked
- [ ] Verified list of referral organisations and legal professionals (Resources page)
- [ ] Programme details: locations, dates and audiences for any planned sessions
- [ ] Downloadable resources (PDF leaflets), if any
- [ ] Privacy notice: retention period, names of hosting and email providers, and review against the Data Protection Act, 2019
- [ ] Disclaimer wording reviewed against the organisation's actual services and legal status
- [ ] Confirm the organisation is not described anywhere as a law firm, legal aid provider, accredited mediation centre or court-annexed mediation provider, unless verified

**Technical checks:**

- [ ] Set all environment variables in the host, and send a real test enquiry end to end
- [ ] Verify the sending domain in Resend
- [ ] Connect the custom domain with HTTPS, and set `NEXT_PUBLIC_SITE_URL`
- [ ] Test on a low-to-mid-range Android phone and on a slow connection
- [ ] Test keyboard-only navigation and a screen reader (e.g. NVDA on Windows, TalkBack on Android)
- [ ] Check every link, button, phone link, email link and map link
- [ ] Run `npm run lint` and `npm run build` with no errors
- [ ] Set up Google Search Console and submit the sitemap
- [ ] Confirm public pages are crawlable (check `/robots.txt`)
- [ ] Record hosting, domain renewal, email and administrator access details in a secure place
