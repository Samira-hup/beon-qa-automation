// cy.step shows each action in the runner and the report. cy.login signs in with the current environment user.

import { currentUsers } from './data/environment';
import { LoginPage } from './pages/LoginPage';

declare global {
  namespace Cypress {
    interface Chainable {
      step(message: string): Chainable<void>;
      login(username?: string, password?: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('step', (message: string) => {
  Cypress.log({
    name: 'step',
    displayName: 'STEP',
    message,
  });

  cy.addTestContext({ title: 'Step', value: message });
});

Cypress.Commands.add('login', (username?: string, password?: string) => {
  if ((username && !password) || (!username && password)) {
    throw new Error('cy.login needs both a username and a password, or neither to use the current environment');
  }

  const account = currentUsers().ui;
  const user = username || account.username;
  const pass = password || account.password;
  const loginPage = new LoginPage();

  Cypress.log({ name: 'login', message: user });

  loginPage.visit();
  loginPage.login(user, pass);
  loginPage.assertInventoryLoaded();
});

export {};
