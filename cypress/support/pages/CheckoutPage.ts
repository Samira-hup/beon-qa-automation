// Checkout screens. Fills the form, checks the overview, and confirms the order.

import type { SelectedItem } from './InventoryPage';
import { assertProductCards, itemTotalLabel } from './productCard';

export type CustomerInfo = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export class CheckoutPage {
  fillInformation(customer: CustomerInfo): void {
    cy.findByTestId('title').should('have.text', 'Checkout: Your Information');
    cy.findByTestId('firstName').should('be.visible').type(customer.firstName);
    cy.findByTestId('lastName').type(customer.lastName);
    cy.findByTestId('postalCode').type(customer.postalCode);
    cy.findByTestId('continue').click();
    cy.location('pathname').should('eq', '/checkout-step-two.html');
  }

  assertOverview(items: SelectedItem[]): void {
    cy.findByTestId('title').should('have.text', 'Checkout: Overview');
    cy.findAllByTestId('inventory-item').should('have.length', items.length);
    assertProductCards(items);
    cy.findByTestId('subtotal-label').should('have.text', itemTotalLabel(items));
  }

  finishPurchase(): void {
    cy.findByTestId('finish').should('be.visible').click();
    cy.location('pathname').should('eq', '/checkout-complete.html');
  }

  assertOrderConfirmed(): void {
    cy.findByTestId('complete-header').should('be.visible').and('have.text', 'Thank you for your order!');
    cy.findByTestId('complete-text').should('be.visible');
    cy.findByTestId('shopping-cart-badge').should('not.exist');
  }
}
