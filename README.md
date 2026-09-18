# Finance Manager

A personal finance dashboard built with Next.js, TypeScript, Prisma, and MySQL. Create wallets, record expenses, and explore transactions by wallet, category, and date.

This is a learning and portfolio project for local demonstrations with fictional data. It is still in development and is not ready for public hosting or real financial information. See the [publication checklist](PUBLICATION_CHECKLIST.md) before sharing or deploying it.

## Features

- Username/email and password authentication, plus Google and GitHub sign-in integrations.
- Wallet creation, balances, primary-wallet selection, and deletion.
- Transaction creation, deletion, details, and filtering.
- Recent transactions and category spending charts.
- Responsive layouts for desktop and smaller screens.

Wallet names are labels only: the application does not connect to banks or move money. Budget management is unfinished. Some overview figures and the wallet chart use placeholder data.

## Stack

| Area | Technology |
| --- | --- |
| Application | Next.js 15 App Router, React 19, TypeScript |
| Authentication | NextAuth.js 4, bcrypt |
| Database | MySQL 8, Prisma 6 |
| Interface | Tailwind CSS, Radix UI, Recharts, Motion |
| Forms | React Hook Form, Zod |

## Local setup

These instructions target a **new, disposable development database**. They were checked against the source; a fresh database and OAuth flow were not run during the documentation review.

### 1. Prerequisites

- Node.js 22 and npm.
- Local MySQL 8, an empty database, and a dedicated database user allowed to create tables in that database.
- Git to clone the repository.

Clone the repository, open its directory, and install the locked dependencies:

```bash
npm ci
```

The current lockfile needs security updates before network exposure. Keep this setup local; see the publication checklist.

### 2. Environment

For a fresh checkout without a local environment file:

```bash
cp .env.example .env
openssl rand -base64 32
```

If `.env` already exists, edit it instead of overwriting your configuration. Put the generated random value in `NEXTAUTH_SECRET` and configure your own database credentials. Never reuse secrets from somebody else's checkout.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | MySQL connection string for your development database |
| `NEXTAUTH_URL` | Normally `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Your private random session secret |
| `GOOGLE_ID`, `GOOGLE_SECRET` | Optional Google OAuth application credentials |
| `GITHUB_ID`, `GITHUB_SECRET` | Optional GitHub OAuth application credentials |

For Node running on your computer, use your database's host address, normally `127.0.0.1`. The hostname `db` refers to the database service **inside the Compose network**. URL-encode special characters in connection-string credentials.

### 3. Empty development database

```bash
npx prisma generate
npx prisma db push
```

`db push` is a temporary local setup path: the current Prisma schema includes `Income`, but the historical category migration does not. Use this only with a new disposable database. It does not repair migration history or provide a production migration strategy. Do not accept data-loss prompts against an existing database.

Transactions require category rows matching the interface's IDs. Execute this SQL against your **new development database** using your MySQL client:

```sql
INSERT INTO categories (category_id, name) VALUES
  (1, 'Food'),
  (2, 'Entertainment'),
  (3, 'Transport'),
  (4, 'Education'),
  (5, 'Other'),
  (6, 'Subscribtions'),
  (7, 'Income');
```

`Subscribtions` is the current database enum spelling. IDs must match `src/app/constants.tsx`. Run this once on an empty category table. Do not import the historical database dump: it contains user records rather than clean example data.

The existing `prisma/seed.ts` creates a fixed demo account and does **not** populate categories. This setup uses registration instead.

### 4. Start the application

```bash
npm run dev -- --hostname 127.0.0.1
```

Open [registration](http://localhost:3000/auth/registration), create a fictional account with a unique disposable password, then open [login](http://localhost:3000/auth/login). If registration does not redirect automatically, visit login manually. Add a wallet before adding transactions.

Password authentication is independent of OAuth. Google/GitHub buttons remain visible when their variables are empty, but those buttons need provider setup. The current login handler logs credentials: do not use a reused or real-account password, and remove that logging before inviting other users.

## Optional OAuth setup

Create your own OAuth application for each provider you want to test. Keep its client secret in your local `.env`.

| Provider | Local callback URL |
| --- | --- |
| Google | `http://localhost:3000/api/auth/callback/google` |
| GitHub | `http://localhost:3000/api/auth/callback/github` |

Use `http://localhost:3000` as the application/homepage URL. Provider access restrictions may require adding permitted test users. Restart the server after changing environment variables.

New developers need their own OAuth credentials only to test social login. For an in-person demonstration on the author's PC, the author's locally configured OAuth application can be used. Never distribute its secrets with source code.

The current email-based account-linking implementation needs security changes before accepting unrelated users. See [NextAuth OAuth documentation](https://next-auth.js.org/configuration/providers/oauth) for provider setup.

## Docker status

The Docker files provide a development web container and MySQL service, but are not a complete fresh-install or production workflow:

- Compose requires private `MYSQL_ROOT_PASSWORD` and `MYSQL_PASSWORD` values in `.env`; the template contains empty placeholders.
- Published ports are not restricted to loopback; restrict them for a PC-only demo and remove unused port `5555`.
- Prisma generation, schema setup, and category initialization are not explicitly performed at startup.
- `.dockerignore` excludes private environment files, Git metadata, and database dumps.

The host-based setup above makes these prerequisites explicit.

## Project layout

```text
src/app/                 Pages, layouts, and API routes
src/components/          Authentication, dashboard, wallet, transaction, and UI components
src/lib/utils/           Authentication, database client, and helpers
prisma/schema.prisma     Data models and enums
prisma/migrations/       Historical migrations
prisma/seed.ts           Existing demo account seed
public/                  Static icons and images
```

## Development commands

| Command | Purpose |
| --- | --- |
| `npm run dev -- --hostname 127.0.0.1` | Local development server |
| `npm run build` | Create a production build |
| `npm run start -- --hostname 127.0.0.1` | Serve an existing production build locally |
| `npm run lint` | Run the configured lint command |
| `npx prisma generate` | Regenerate the client after schema changes |

No automated test script is configured. A successful build is not a security check; `next.config.ts` currently skips ESLint checks during builds.

## Known limitations

- Budget management and some dashboard metrics are placeholders.
- Income is a category label; the transaction endpoint deducts amounts from balances, including that category.
- Deleting a transaction does not restore the wallet balance.
- Financial values use floating-point storage; server validation and atomic balance updates need improvement.
- Migration history and reference-data seeding need reconciliation.
- Authentication linking, password logging, dependencies, and deployment configuration need work before public hosting.

## Sharing

Public source can be viewed without running the application. Screenshots or a short recording with fictional data also work for a portfolio. Publishing source does not require exposing your PC to the internet.

Follow [PUBLICATION_CHECKLIST.md](PUBLICATION_CHECKLIST.md) first: the public-facing main history has been cleaned of private environment files, database dumps, and known secrets. Previously committed credentials still need rotation before changing visibility. No license file is included; choose an appropriate license if you want to explicitly permit reuse, and check attribution requirements for third-party assets.
