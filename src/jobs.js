const logoFiles = import.meta.glob('./assets/logos/*', { eager: true, import: 'default' })

export function logoFor(slug) {
  for (const [path, url] of Object.entries(logoFiles)) {
    if (path.includes(`/${slug}.`)) return url
  }
  return null
}

export const jobs = [
  {
    slug: 'alien',
    hash: 'f3a9c21',
    company: 'Alien',
    role: 'Backend development · client',
    dates: 'May 2026 — Jul 2026',
    location: 'remote · Serbia',
    about:
      'Crypto wallet & digital identity app: self-custodial wallet, payments, Visa cards, encrypted messaging. Delivered features across 8 Go microservices end-to-end — from API and schema design to load testing and Terraform. The engagement ended in July 2026 when the company pivoted to an AI product.',
    summary:
      'Self-custodial crypto wallet & digital identity app. Delivered features end-to-end across 8 Go microservices — payments, cards, encrypted messaging.',
    bullets: [
      'Launched Visa cards in the app by integrating the Wirex Banking-as-a-Service platform: a Go microservice issuing user-scoped auth tokens for direct client-to-Wirex API calls, mirroring card state, and turning webhooks + polling into a transaction feed with push notifications — live across 3 environments.',
      'Enabled in-app Bitcoin trading via the Flashnet DEX (Spark): quote/estimate flow, webhook pipeline, and buy-and-bridge market transactions.',
      'Scaled contact-to-profile matching to 50M contacts by rebuilding the pipeline: batch migrators, phone-number normalization, partial indexes. Eliminated search timeouts by replacing full-table LIKE scans with a GIN-indexed trigram tsvector over concatenated profile fields, cutting lookups by phone, name or address to sub-second, validated by purpose-built load tests.',
      'Built a contest & leaderboard platform from scratch — seasons, invite reconciliation, winner lottery, on-chain payouts, event-driven push notifications — deployed to AWS in under 3 weeks.',
      'Reduced payment-fraud surface by hardening fiat on/off-ramp webhook verification (constant-time signature comparison) across providers, including MoonPay.',
      'Shipped encrypted-message caching for XMTP chat; extended the push service with iOS Live Activities.',
    ],
    tags: 'go · postgresql · redis/valkey · aws · terraform · grpc/rest · solana · bitcoin/spark · xmtp',
  },
  {
    slug: 'redtrack',
    hash: 'b7e04d8',
    company: 'RedTrack.io',
    role: 'Backend development · client',
    dates: 'Nov 2025 — May 2026 · 7 mo',
    location: 'remote',
    about: 'Ad-tracking and marketing analytics platform.',
    summary:
      'Ad-tracking and marketing analytics platform. Analytics on billion-row ClickHouse tables, auth & billing, ad-network integrations.',
    bullets: [
      'Optimized the NCPA metric in cohort reports by replacing a billion-row ClickHouse JOIN with a pre-computed field via Scylla lookups; changes spanned 4 services, with a backfill worker for ~820K customers (batching, fingerprint deduplication).',
      'Researched a ClickHouse → StarRocks migration: prototyped, benchmarked on production data, delivered a technical assessment.',
      'Designed and shipped OAuth 2.0 authentication from scratch (redirect flow, token exchange, refresh tokens); integrated Stripe Payment Links into billing (webhooks, transaction mapping); migrated password hashing SHA1 → bcrypt with transparent re-hash on login — zero downtime.',
      'Built ad-network API integrations for cost import and conversion export with deduplication, rate-limit handling and retries; event-driven NSQ workers for click/conversion/billing processing with batching and exponential backoff.',
      'Contributed to the Customer Data Platform (CDP): first/last-touch attribution, cross-browser fingerprint matching, postback-token deduplication.',
    ],
    tags: 'go · clickhouse · scylladb · starrocks · mongodb · nsq · oauth 2.0 · stripe',
  },
  {
    slug: 'simbirsoft',
    hash: 'e9021bc',
    company: 'SimbirSoft',
    role: 'Backend development · in-house',
    dates: 'Oct 2023 — Nov 2024 · 1 yr 2 mo',
    location: 'Ulyanovsk, Russia',
    about: 'Software development company serving enterprise clients.',
    summary:
      'Software development company. Enterprise projects for a major mobile operator and an electronics retail chain.',
    bullets: [
      'Decomposed a legacy monolith into Go microservices for one of the largest mobile network operators; designed databases for the new services, ran code reviews and managed releases.',
      'Designed and built a microservice for a major electronics retail chain, including Yandex Pay integration and full technical documentation.',
    ],
    tags: 'go · postgresql · microservices · rest',
  },
  {
    slug: 'shtrafovnet',
    hash: 'a4c78e2',
    company: 'ShtrafovNet',
    role: 'Backend development · in-house',
    dates: 'May 2023 — Oct 2023 · 6 mo',
    location: 'Voronezh, Russia',
    about: 'Traffic-fines checking and payment service.',
    summary:
      'Traffic-fines checking and payment service. Monolith decomposition and a billing microservice.',
    bullets: [
      'Split a monolith into services; designed and shipped a billing microservice, adapting it for required load and optimizing SQL queries for performance.',
    ],
    tags: 'go · billing',
  },
  {
    slug: 'knopkalab',
    hash: 'd06f913',
    company: 'KnopkaLab',
    role: 'Backend development · in-house',
    dates: 'Aug 2020 — Mar 2022 · 1 yr 8 mo',
    location: '',
    about: 'Product studio automating routine operations.',
    summary:
      'Product studio automating routine operations. Logging service and Telegram bots in Go — first production experience.',
    bullets: [
      'Built a logging service in Go and an in-house Telegram Bot API library used for automating routine operations; wrote unit tests and participated in code reviews.',
    ],
    tags: 'go · telegram bot api',
  },
]
