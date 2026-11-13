# Bug

**Title:** Product photo and name open the wrong item

**Environment / credentials:**

- App: SauceDemo
- URL: https://www.saucedemo.com/
- Browser: Chromium
- Username: problem_user
- Password: secret_sauce

**Summary:** On the inventory page, the image and the product name of every card navigate to the next catalog id. The shopper does not land on the product they clicked. The last product points at an id that does not exist. The same checks with standard_user open the correct item.

**Steps to reproduce:**

1. Open https://www.saucedemo.com/.
2. Log in with problem_user / secret_sauce.
3. Click the photo of Sauce Labs Bike Light (catalog id 0).
4. Go back and click the photo of Sauce Labs Fleece Jacket (catalog id 5).

**Actual result:** Bike Light opens /inventory-item.html?id=1 and shows Sauce Labs Bolt T-Shirt. Every card is off by one: the image and the name both send id + 1. Fleece Jacket opens /inventory-item.html?id=6 and the page says ITEM NOT FOUND.

**Expected result:** Bike Light opens /inventory-item.html?id=0 and shows Sauce Labs Bike Light. Fleece Jacket opens /inventory-item.html?id=5 and shows Sauce Labs Fleece Jacket. The same is true if you click the product name.

**Severity:** Major

**Screenshots:** None.
