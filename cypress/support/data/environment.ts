// Looks up the URLs and users for whichever environment the suite is running.

import { environmentUrls, resolveEnvironment, type EnvironmentName } from './urls';
import { users, type EnvironmentUsers } from './users';

export function currentEnvironment(): EnvironmentName {
  return resolveEnvironment(Cypress.env('environment'));
}

export function currentUrls(): { ui: string; api: string } {
  return environmentUrls(currentEnvironment());
}

export function currentUsers(): EnvironmentUsers {
  return users[currentEnvironment()];
}
