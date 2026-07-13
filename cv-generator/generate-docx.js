const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  LevelFormat, convertInchesToTwip, BorderStyle, TabStopType, TabStopPosition,
  ExternalHyperlink
} = require('docx');
const fs = require('fs');

const FONT = 'Calibri';
const GRAY = '505050';
// sizes in half-points per skill spec: name 16pt=32, heading 11.5pt=23, body 10.5pt=21, tech 9.5pt=19
const SZ = { name: 32, heading: 23, body: 21, tech: 19 };
const LINE = 260; // 13pt line spacing in twips

function bullet(text) {
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    spacing: { after: 40, before: 20, line: LINE },
    children: [new TextRun({ text, font: FONT, size: SZ.body })],
  });
}

function sectionHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 200, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: '000000', space: 2 } },
    children: [new TextRun({ text, font: FONT, size: SZ.heading, bold: true, color: '000000' })],
  });
}

function jobHead(title, company, location, dates) {
  return new Paragraph({
    spacing: { before: 140, after: 20, line: LINE },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: title, font: FONT, size: SZ.body, bold: true }),
      new TextRun({ text: `,  ${company}` + (location ? `  –  ${location}` : ''), font: FONT, size: SZ.body }),
      new TextRun({ text: `\t${dates}`, font: FONT, size: SZ.body }),
    ],
  });
}

function jobDesc(text) {
  return new Paragraph({
    spacing: { after: 40, line: LINE },
    children: [new TextRun({ text, font: FONT, size: SZ.body, italics: true, color: GRAY })],
  });
}

function techLine(items) {
  return new Paragraph({
    spacing: { after: 20, before: 20, line: LINE },
    children: [
      new TextRun({ text: 'Technologies: ', font: FONT, size: SZ.tech, bold: true, italics: true, color: GRAY }),
      new TextRun({ text: items, font: FONT, size: SZ.tech, italics: true, color: GRAY }),
    ],
  });
}

function skillLine(label, items) {
  return new Paragraph({
    spacing: { after: 40, line: LINE },
    children: [
      new TextRun({ text: `${label}: `, font: FONT, size: SZ.body, bold: true }),
      new TextRun({ text: items, font: FONT, size: SZ.body }),
    ],
  });
}

function link(url, text) {
  return new ExternalHyperlink({
    link: url,
    children: [new TextRun({ text, font: FONT, size: SZ.body, color: '000000' })],
  });
}

const sep = new TextRun({ text: '   |   ', font: FONT, size: SZ.body, color: GRAY });

const doc = new Document({
  numbering: {
    config: [{
      reference: 'bullets',
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: '\u2022', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: convertInchesToTwip(0.22), hanging: convertInchesToTwip(0.14) } } },
      }],
    }],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 }, // 0.75in
      },
    },
    children: [
      // ===== Header (centered) =====
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 40 },
        children: [new TextRun({ text: 'Fedor Berman', font: FONT, size: SZ.name, bold: true })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 40, line: LINE },
        children: [new TextRun({ text: 'Senior Backend Engineer  ·  Go  ·  Distributed Systems  ·  Fintech & Crypto', font: FONT, size: SZ.body, bold: true })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60, line: LINE },
        children: [
          new TextRun({ text: 'Belgrade, Serbia', font: FONT, size: SZ.body }),
          sep,
          new TextRun({ text: '+381 65 319 6974', font: FONT, size: SZ.body }),
          sep,
          link('mailto:fyodorberman@gmail.com', 'fyodorberman@gmail.com'),
          sep,
          link('https://linkedin.com/in/fyodor-berman', 'linkedin.com/in/fyodor-berman'),
          sep,
          link('https://t.me/TeoBy', 't.me/TeoBy'),
          sep,
          link('https://fberman.me', 'fberman.me'),
        ],
      }),

      // ===== Summary =====
      sectionHeading('SUMMARY'),
      new Paragraph({
        spacing: { after: 60, line: LINE },
        children: [new TextRun({
          text: 'Senior Backend Engineer with 5+ years of experience designing and shipping fintech, crypto, and high-load distributed systems in Go. Launched Visa card issuing through a Banking-as-a-Service (BaaS) integration, a Bitcoin decentralized exchange (DEX) integration, and fiat on/off-ramps at a crypto wallet startup. Contributed to a mail service sustaining 10,000+ requests per second (RPS) at VK, one of the largest social networks in Eastern Europe, and optimized billion-row ClickHouse analytics. End-to-end ownership: API and database schema design, load testing, infrastructure as code (Terraform), and production on-call',
          font: FONT, size: SZ.body,
        })],
      }),

      // ===== Skills =====
      sectionHeading('SKILLS'),
      skillLine('Languages', 'Go (Golang), SQL, Bash'),
      skillLine('Databases', 'PostgreSQL, ClickHouse, StarRocks, MySQL, ScyllaDB (Cassandra), Tarantool, Redis (Valkey), MongoDB'),
      skillLine('Messaging & APIs', 'Apache Kafka, NSQ, RabbitMQ, gRPC, Protobuf, REST (JSON), OAuth 2.0, webhooks, Stripe'),
      skillLine('Cloud & Infrastructure', 'AWS (RDS, S3, IAM), Kubernetes, Terraform, Docker, GitLab CI/CD, Puppet, Grafana, ELK / Loki, Linux'),
      skillLine('Blockchain', 'Solana, Bitcoin (Spark), Lightning Network, XMTP'),
      skillLine('Concepts', 'Distributed Systems, Microservices, Event-Driven Architecture, Observability, Performance Optimization, Load Testing'),

      // ===== Experience =====
      sectionHeading('EXPERIENCE'),

      jobHead('Backend Engineer', 'Alien', 'Remote', 'May 2026 – July 2026'),
      jobDesc('Crypto wallet and digital identity app: self-custodial wallet, payments, Visa cards, encrypted messaging. Shipping across 8 Go microservices'),
      bullet('Launched Visa cards in the app by integrating the Wirex Banking-as-a-Service (BaaS) platform: built a Go microservice issuing user-scoped auth tokens, mirroring card state, and turning webhooks and polling into a real-time transaction feed with push notifications — live across 3 environments'),
      bullet('Enabled in-app Bitcoin trading via the Flashnet decentralized exchange (DEX) on Spark: quote/estimate flow, webhook processing pipeline, and buy-and-bridge market transactions'),
      bullet('Scaled contact-to-profile matching to 50 million contacts by rebuilding the ingestion pipeline: batch migrators, phone-number normalization, partial indexes; reduced profile search latency by redesigning PostgreSQL full-text search indexes, validated with purpose-built load tests'),
      bullet('Built a contest and leaderboard platform from scratch — seasons, invite reconciliation, winner lottery, on-chain payouts, event-driven push notifications — deployed to AWS in under 3 weeks'),
      bullet('Reduced payment-fraud surface by hardening webhook signature verification (constant-time comparison) for fiat on/off-ramp providers, including MoonPay'),
      bullet('Shipped encrypted-message caching for XMTP (Extensible Message Transport Protocol) chat; extended the push-notification service with iOS Live Activities'),
      techLine('Go, PostgreSQL, Redis / Valkey, AWS, Terraform, gRPC, REST, Solana, Bitcoin (Spark), XMTP'),

      jobHead('Backend Engineer', 'RedTrack.io', 'Remote', 'Nov 2025 – May 2026'),
      jobDesc('Ad-tracking and marketing analytics platform (SaaS)'),
      bullet('Eliminated a billion-row ClickHouse JOIN in cohort reports by pre-computing the NCPA (net cost per action) metric via ScyllaDB lookups; changes spanned 4 services, including a backfill worker for ~820,000 customers with batching and fingerprint deduplication'),
      bullet('Prototyped and benchmarked a ClickHouse-to-StarRocks migration on production-scale data'),
      bullet('Designed OAuth 2.0 authentication from scratch (redirect flow, token exchange, refresh tokens); integrated Stripe Payment Links into billing; migrated password hashing from SHA-1 to bcrypt with transparent re-hash on login — zero downtime'),
      bullet('Built ad-network API integrations for cost import and conversion export with deduplication, rate-limit handling, and retries; implemented event-driven NSQ workers with batching and exponential backoff'),
      bullet('Contributed to the Customer Data Platform (CDP): first/last-touch attribution, cross-browser fingerprint matching, postback-token deduplication'),
      techLine('Go, ClickHouse, StarRocks, ScyllaDB, MongoDB, NSQ, OAuth 2.0, Stripe'),

      jobHead('Backend Engineer', 'VK Tech', '', 'Nov 2024 – Nov 2025'),
      jobDesc('Infrastructure for VK Mail — the mail service of the largest Russian social network'),
      bullet('Contributed to a distributed mail service sustaining 10,000+ requests per second (RPS): implemented MySQL-to-Tarantool replication with strong consistency, fixed sharding and routing issues in Tarantool proxies, and optimized low-level data serialization — reducing latency and improving stability'),
      bullet('Designed and debugged cross-zone event-driven replication on Apache Kafka; built an artifact delivery service with S3 integration wired into the team\u2019s CI/CD pipeline'),
      bullet('Migrated critical services from bare metal and on-premises Kubernetes to the cloud; authored Kubernetes and Puppet manifests; took regular on-call duty during failure drills and disaster-recovery scenarios'),
      techLine('Go, MySQL, Tarantool, Apache Kafka, Kubernetes, Puppet, S3, CI/CD'),

      jobHead('Backend Engineer', 'SimbirSoft', '', 'Oct 2023 – Nov 2024'),
      jobDesc('Software development company serving enterprise clients'),
      bullet('Decomposed a legacy monolith into Go microservices for one of the largest mobile network operators; designed databases for the new services, ran code reviews, and managed releases'),
      bullet('Designed and built a microservice for a major electronics retail chain, including Yandex Pay payment integration and full technical documentation'),
      techLine('Go, PostgreSQL, microservices, REST'),

      jobHead('Go Developer', 'ShtrafovNet', '', 'May 2023 – Oct 2023'),
      bullet('Split a monolith into services; designed and shipped a billing microservice, adapting it for the required load and optimizing SQL queries for performance'),

      jobHead('Junior Developer', 'KnopkaLab', '', 'Aug 2020 – Mar 2022'),
      bullet('Built a logging service in Go and an in-house Telegram Bot API library used for automating routine operations; wrote unit tests and participated in code reviews'),

    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(require('path').join(__dirname, 'Fedor_Berman_CV_ATS.docx'), buf);
  console.log('done');
});
