// Product list. Adds a few different items and opens the cart.

export type SelectedItem = {
  name: string;
  price: string;
};

export class InventoryPage {
  addDistinctItems(count: number): Cypress.Chainable<SelectedItem[]> {
    const selected: SelectedItem[] = [];

    cy.findAllByTestId('inventory-item').should('have.length.at.least', count);

    Cypress._.times(count, (index) => {
      cy.findAllByTestId('inventory-item')
        .eq(index)
        .within(() => {
          cy.findByTestId('inventory-item-name')
            .invoke('text')
            .then((name) => {
              cy.findByTestId('inventory-item-price')
                .invoke('text')
                .then((price) => {
                  selected.push({ name: name.trim(), price: price.trim() });
                });
            });

          cy.findByTestId(/^add-to-cart/).should('be.visible').click();
        });
    });

    cy.findByTestId('shopping-cart-badge').should('have.text', String(count));

    return cy.then(() => {
      expect(selected, 'items added from the inventory').to.have.length(count);
      const names = selected.map((item) => item.name);
      expect(new Set(names).size, 'distinct product names').to.eq(count);
      return selected;
    });
  }

  openCart(): void {
    cy.findByTestId('shopping-cart-link').click();
    cy.location('pathname').should('eq', '/cart.html');
  }
}
