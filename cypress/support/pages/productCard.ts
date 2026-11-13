// Shared product checks for the cart and the overview: name, price, quantity, and the item total.

import type { SelectedItem } from './InventoryPage';

function withinProductCard(name: string, check: () => void): void {
  cy.findAllByTestId('inventory-item-name').should(($names) => {
    const found = [...$names].some((el) => el.textContent?.trim() === name);
    expect(found, name).to.eq(true);
  });

  cy.findAllByTestId('inventory-item').each(($card) => {
    cy.wrap($card)
      .findByTestId('inventory-item-name')
      .invoke('text')
      .then((text) => {
        if (text.trim() !== name) {
          return;
        }

        cy.wrap($card).within(check);
      });
  });
}

export function assertProductCards(items: SelectedItem[]): void {
  items.forEach((item) => {
    withinProductCard(item.name, () => {
      cy.findByTestId('inventory-item-name').should('have.text', item.name);
      cy.findByTestId('inventory-item-price').should('have.text', item.price);
      cy.findByTestId('item-quantity').should('have.text', '1');
    });
  });
}

export function itemTotalLabel(items: { price: string }[]): string {
  const cents = items.reduce((sum, item) => sum + Math.round(Number(item.price.replace('$', '')) * 100), 0);
  return `Item total: $${(cents / 100).toFixed(2)}`;
}
