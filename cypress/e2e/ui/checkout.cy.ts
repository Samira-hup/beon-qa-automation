import { checkoutCustomer } from '../../support/data/data';
import { currentEnvironment, currentUsers } from '../../support/data/environment';
import { CartPage } from '../../support/pages/CartPage';
import { CheckoutPage } from '../../support/pages/CheckoutPage';
import { InventoryPage } from '../../support/pages/InventoryPage';

describe('SauceDemo checkout', () => {
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();

  it('purchases two distinct products', () => {
    cy.step(`Log in as ${currentUsers().ui.username} on ${currentEnvironment()}`);
    cy.login();

    cy.step('Add two distinct products');
    inventoryPage.addDistinctItems(2).then((items) => {
      cy.step('Open the cart');
      inventoryPage.openCart();

      cy.step('Verify cart items and quantities');
      cartPage.assertItems(items);

      cy.step('Start checkout');
      cartPage.startCheckout();

      cy.step('Complete the checkout form');
      checkoutPage.fillInformation(checkoutCustomer);

      cy.step('Confirm the overview lists the two products');
      checkoutPage.assertOverview(items);

      cy.step('Finish the purchase');
      checkoutPage.finishPurchase();

      cy.step('Confirm the order confirmation message');
      checkoutPage.assertOrderConfirmed();
    });
  });
});
