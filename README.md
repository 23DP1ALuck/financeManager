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

## Run with Docker Compose

Install Docker Desktop (or Docker Engine with the Compose plugin) and make sure it is running. Docker provides Node.js and MySQL, so you do not need to install them separately on your computer.

After completing the first-time setup below, start the project with:

```bash
docker compose build
docker compose up
```

Or combine both commands:

```bash
docker compose up --build
```

Open [http://localhost:3000/auth/login](http://localhost:3000/auth/login). The root page is only a basic landing page.

## First-time setup

### 1. Clone and configure

```bash
git clone https://github.com/23DP1ALuck/financeManager.git
cd financeManager
cp .env.example .env
```

If you already have a local `.env`, edit it instead of overwriting it. Set these values:

| Variable | Value |
| --- | --- |
| `MYSQL_ROOT_PASSWORD` | A private password for the MySQL root user |
| `MYSQL_PASSWORD` | A different private password for the application database user |
| `DATABASE_URL` | `mysql://appuser:YOUR_APP_PASSWORD@db:3306/finance` |
| `NEXTAUTH_URL` | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | A private random session secret |
| `GOOGLE_ID`, `GOOGLE_SECRET` | Optional Google OAuth application credentials |
| `GITHUB_ID`, `GITHUB_SECRET` | Optional GitHub OAuth application credentials |

Replace `YOUR_APP_PASSWORD` with the same password as `MYSQL_PASSWORD`. URL-encode special characters in the connection-string password. Use **`db`**, not `localhost`, as the database hostname inside the web container. The example environment file uses a host-based database URL, so replace it with the Compose URL above.

Keep `.env` private; it is ignored by Git and Docker builds. Docker Compose reads it at runtime.

### 2. Build the image and start MySQL

```bash
docker compose build
docker compose up -d db
docker compose logs -f db
```

Wait for MySQL to finish initialization and report that it is ready for connections. Press Ctrl+C to stop following the logs; the database keeps running. Compose currently has no database health check, so starting the container alone does not guarantee MySQL is ready.

If you need a session secret, generate one using Node inside the image:

```bash
docker compose run --rm --no-deps web node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the result into `NEXTAUTH_SECRET` in `.env` before starting the application.

### 3. Initialize a new development database

```bash
docker compose run --rm web npx prisma generate
docker compose run --rm web npx prisma db push
```

These are first-time steps for a **new, disposable database**. The Dockerfile does not generate the Prisma client or initialize the schema automatically.

The current schema includes `Income`, but the historical category migration does not. `db push` is a temporary local setup path, not a production migration strategy. Do not accept data-loss prompts against an existing database.

Populate the categories required by the interface. Run the following once against the new, empty category table, using a shell that supports heredocs (such as Bash or Zsh):

```bash
docker compose exec -T db sh -c 'MYSQL_PWD="$MYSQL_PASSWORD" exec mysql -u "$MYSQL_USER" "$MYSQL_DATABASE"' <<'SQL'
INSERT INTO categories (category_id, name) VALUES
  (1, 'Food'),
  (2, 'Entertainment'),
  (3, 'Transport'),
  (4, 'Education'),
  (5, 'Other'),
  (6, 'Subscribtions'),
  (7, 'Income');
SQL
```

Alternatively, execute that SQL through a MySQL client connected to the development database. `Subscribtions` is the current database enum spelling, and the IDs match `src/app/constants.tsx`.

The existing `prisma/seed.ts` creates a fixed demo account but does not populate categories. Use registration instead, and do not restore private database dumps as sample data.

### 4. Start and register

```bash
docker compose up
```

Open [registration](http://localhost:3000/auth/registration), create a fictional account with a unique disposable password, and visit [login](http://localhost:3000/auth/login). If registration does not redirect automatically, open login manually. Add a wallet before adding transactions.

Password login does not require OAuth. Google/GitHub buttons remain visible without configuration, but only work after provider setup. The current login handler logs credentials, so do not use a reused or real-account password.

MySQL data persists in the `mysql_data` volume between runs. You do not need to initialize the database each time. Changing passwords in `.env` does not change users in an already initialized MySQL volume.

These instructions were checked against the configuration; a clean image build and fresh-database setup were not executed during this documentation update.

## Optional OAuth setup

Create your own OAuth application for each provider you want to test. Keep its client secret in your local `.env`.

| Provider | Local callback URL |
| --- | --- |
| Google | `http://localhost:3000/api/auth/callback/google` |
| GitHub | `http://localhost:3000/api/auth/callback/github` |

Use `http://localhost:3000` as the application/homepage URL. Provider access restrictions may require adding permitted test users. Restart the server after changing environment variables.

New developers need their own OAuth credentials only to test social login. For an in-person demonstration on the author's PC, the author's locally configured OAuth application can be used. Never distribute its secrets with source code.

The current email-based account-linking implementation needs security changes before accepting unrelated users. See [NextAuth OAuth documentation](https://next-auth.js.org/configuration/providers/oauth) for provider setup.

## Docker notes

- The web container runs the Next.js development server with the source directory mounted for live updates.
- The current configuration publishes web port `3000`, MySQL port `3306`, and unused port `5555`. Ports are not restricted to loopback; restrict them before using this on an untrusted network.
- `.dockerignore` excludes private environment files, Git metadata, and database dumps.
- Use fictional data for demonstrations. This configuration is not ready for public hosting; see the [publication checklist](PUBLICATION_CHECKLIST.md).

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

## Useful commands

| Command | Purpose |
| --- | --- |
| `docker compose build` | Build the web image |
| `docker compose up` | Start the application and database with logs |
| `docker compose up --build` | Build and start in one command |
| `docker compose up -d` | Start in the background |
| `docker compose logs -f web` | Follow application logs |
| `docker compose down` | Stop and remove containers, keeping database volumes |
| `docker compose run --rm web npx prisma generate` | Regenerate Prisma after schema changes |
| `docker compose exec web npm run lint` | Run the configured lint command in a running web container |

Do not use `docker compose down -v` unless you intend to delete the development database volume. No automated test script is configured, and production builds currently skip ESLint checks.

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
