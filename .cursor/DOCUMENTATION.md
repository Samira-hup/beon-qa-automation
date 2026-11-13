# QA Automation Exercise

## Welcome

At BEON, we pride ourselves on partnering with "The Keepers" — the top tech talent in Latin America.

This challenge evaluates more than passing tests. It also evaluates architectural thinking, coding best practices, and communication as a Senior QA Automation Engineer.

## Challenge guidelines

### Tech stack

Use a modern automation framework (Playwright, Cypress, WebdriverIO, or Selenium) and a language (TypeScript, Python, or Java).

TypeScript with Playwright or Cypress is recommended.

### Time management

In the live-coding session, quality and architecture matter more than finishing every scenario.

Explain the thought process while working.

### Design patterns

Use a scalable pattern:

- Page Object Model (POM)
- Screenplay Pattern
- Action Classes

Apply clean code principles.

### AI usage policy

Modern engineers may use AI tools (GitHub Copilot, ChatGPT, Claude). Use AI as an assistant.

**Allowed**

- Project scaffolding
- Configuration files, such as `tsconfig.json` and reporting setup
- Dummy data and JSON payloads
- Syntax lookups

**Allowed with review**

- Autocompleting test steps
- The author remains responsible for the logic, the waits, and the fit with the architecture

**Not allowed**

- Defining the framework architecture
- Selecting DOM locators, including pasting HTML into a prompt
- Manual bug hunting

Every line of code must be explainable by the author.

## Part 1: API automation

**Target:** Restful-Booker

Automate the lifecycle of a booking by chaining API requests. Each request uses data from the previous one.

AI may generate JSON payloads or request boilerplates. Extracting the token and the booking id, and chaining the requests, is manual work.

1. **Authentication.** Generate an auth token with `POST /auth`.
2. **Create booking.** `POST /booking`. Validate `200 OK`. Extract `bookingid`.
3. **Read booking.** `GET` the extracted id. Validate that the response data matches the created booking.
4. **Update booking.** `PUT` with the auth token in the header. Update the checkout date. Validate the update.
5. **Delete booking.** `DELETE`. Validate `201 Created`. Confirm with `GET` that the booking returns `404 Not Found`.

## Part 2: UI automation

**Target:** SauceDemo (Swag Labs)

Automate the critical e-commerce flow. Focus on locator strategy, wait handling, and page transitions.

Inspect the DOM and choose the locators manually. Do not use AI to generate page objects or locator strategies.

1. **Login.** Use the `standard_user` credentials.
2. **Inventory.** Add exactly two distinct items dynamically.
3. **Cart.** Open the cart and validate the items and the quantity.
4. **Checkout.** Complete the checkout form.
5. **Confirmation.** Complete the purchase and verify the message `Thank you for your order!`.

## Part 3: Deliverables

Documentation and QA judgment matter because BEON engineers work with U.S. clients.

### 1. Manual bug report

Explore SauceDemo as `problem_user`. This exploration is manual. AI is not allowed.

Identify at least one bug and include it in the README:

- Title
- Description
- Steps to reproduce
- Expected result and actual result
- Severity

### 2. README

AI may format the README. The explanations are the author's.

Include:

- Prerequisites
- Installation instructions
- Execution commands for UI versus API, and headless versus headed
- An explanation of the framework architecture

### 3. Test reporting

Optional and recommended. Integrate a reporter such as the Playwright HTML reporter, Allure, or Mochawesome.

## Evaluation rubric

- **Locators and stability.** Resilient locators (`data` attributes, semantic text). No brittle XPath. Proper waits. Locators are chosen without AI.
- **Architecture and clean code.** DRY. Page Object Model or action classes.
- **API and UI synchronization.** API state and data flow are handled explicitly.
- **Comprehension.** Technical decisions can be explained clearly.
