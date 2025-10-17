# BTCdirect QA Engineer Assignment

## Overview
This repository contains end-to-end tests for BTCdirect, developed as part of a QA Engineer assignment.  

## Architecture

This project follows a POM and modular structure optimized for scalability and maintainability.

- **Page Object Model (`pages/`)** – encapsulates selectors and user actions
- **Tests (`tests/`)** – organized by feature (landing, login, access control)
- **Test Data (`tests/test-data/`)** – fixtures and test data
- **Tagging (`tags/tags.ts`)** – enables selective execution (`@smoke`, `@regression`, `@authentication`)

## Tech Stack

- [Playwright](https://playwright.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [TypeScript](https://www.typescriptlang.org/)

## Assignment Alignment

This project satisfies the following requirements:
- Modular Playwright project with tagged tests  
- Basic reporting (traces, screenshots, videos on retry/failure)  
- Scenarios implemented:
  - Successful and failed login cases  
  - Access control for protected routes  
  - Bonus: navigation smoke tests  
- GitHub Actions workflows for local and CI execution  

## How to run the Project

### Prerequisites

- Node.js  
- npm  
- git  

---

### Installation & Setup

```bash
npm ci
npx playwright install
```

Create a `.env` file from `.env.example` file and update varaibles accordingly:

```bash
cp .env.example .env
```

---

### Running Tests

**Headless mode**

```bash
npm run pw:test:headless
```

**UI mode (debug)**

```bash
npm run pw:test
```

**Codegen (optional)**

```bash
npm run pw:codegen
```

**Filtering by tags**

```bash
npx playwright test --grep @smoke
npx playwright test --grep @authentication
```

## Reports

After a run, open the Playwright HTML report:

```bash
npx playwright show-report
```

## Continuous Integration

This repository includes two GitHub Actions workflows:

* **Playwright Tests (`.github/workflows/playwright.yml`)** – runs tests and uploads reports
* **Code Quality Verification (`.github/workflows/verify.yaml`)** – runs ESLint and formatting checks

Both workflows trigger on pushes and pull requests to `main`.
