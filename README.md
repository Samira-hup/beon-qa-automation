# BEON QA Automation

Cypress + TypeScript. Two flows: the Restful-Booker API and the SauceDemo checkout.

## Prerequisites

- Node.js 20 or newer
- npm

TypeScript stays on 5.8. Cypress 14 cannot compile TypeScript 7.

## Installation

```bash
npm install
```

## Run

Headless is the default. The `:headed` scripts open the browser. Set `ENVIRONMENT` to `qa`, `dev`, `sandbox`, or `stage`. When it is omitted, the suite runs on QA.

| What | Command |
|---|---|
| API, headless | `npm run test:api` |
| UI, headless | `npm run test:ui` |
| API, browser open | `npm run test:api:headed` |
| UI, browser open | `npm run test:ui:headed` |
| Both, headless | `npm test` |
| Cypress UI | `npm run cy:open` |

| Environment | Command |
|---|---|
| QA | `npm test` |
| dev | `ENVIRONMENT=dev npm test` |
| sandbox | `ENVIRONMENT=sandbox npm test` |
| stage | `ENVIRONMENT=stage npm test` |

The same variable works on every script, for example `ENVIRONMENT=stage npm run test:ui:headed`. QA points at the live SauceDemo and Restful-Booker apps. Dev, sandbox, and stage are simulated, so those runs select their URLs and users and do not reach a real app.

The HTML report is written to `cypress/reports` after `cypress run`.

QA logins, also in `cypress/support/data/users.ts`. `cy.login()` uses the standard user of the selected environment:

| App | Username | Password |
|---|---|---|
| SauceDemo | `standard_user` | `secret_sauce` |
| Restful-Booker | `admin` | `password123` |

## Environments

Stored in `cypress/support/data/urls.ts`. The selected environment comes from `ENVIRONMENT` and defaults to QA. Dev, sandbox, and stage are simulated.

| Environment | UI | API |
|---|---|---|
| QA | `https://www.saucedemo.com` | `https://restful-booker.herokuapp.com` |
| dev | `https://dev.saucedemo.com` | `https://dev.restful-booker.herokuapp.com` |
| sandbox | `https://sandbox.saucedemo.com` | `https://sandbox.restful-booker.herokuapp.com` |
| stage | `https://stage.saucedemo.com` | `https://stage.restful-booker.herokuapp.com` |
