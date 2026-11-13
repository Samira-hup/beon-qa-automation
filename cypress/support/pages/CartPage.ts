// Cart screen. Checks the items you added and starts checkout.

import type { SelectedItem } from './InventoryPage';
import { assertProductCards } from './productCard';

export class CartPage {
  assertItems(items: SelectedItem[]): void {
    cy.findByTestId('title').should('have.text', 'Your Cart');
    cy.findAllByTestId('inventory-item').should('have.length', items.length);
    cy.findByTestId('shopping-cart-badge').should('have.text', String(items.length));
    assertProductCards(items);
  }

  startCheckout(): void {
    cy.findByTestId('checkout').should('be.visible').click();
    cy.location('pathname').should('eq', '/checkout-step-one.html');
  }
}
