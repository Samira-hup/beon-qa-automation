// Login screen. Fills the form and waits until the product list is on screen.

export class LoginPage {
  visit(): void {
    cy.visit('/');
  }

  login(username: string, password: string): void {
    cy.findByTestId('username').should('be.visible').clear().type(username);
    cy.findByTestId('password').should('be.visible').clear().type(password, { log: false });
    cy.findByTestId('login-button').should('be.enabled').click();
  }

  assertInventoryLoaded(): void {
    cy.location('pathname').should('eq', '/inventory.html');
    cy.findByTestId('title').should('have.text', 'Products');
    cy.findByTestId('inventory-list').should('be.visible');
    cy.findAllByTestId('error').should('not.exist');
  }
}
