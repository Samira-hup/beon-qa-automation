# Bug

**Title:** Every inventory image is the broken-image file

**Environment / credentials:**

- App: SauceDemo
- URL: https://www.saucedemo.com/
- Browser: Chromium
- Username: problem_user
- Password: secret_sauce

**Summary:** Every product card shows the same missing image. The name and the price are still correct. The photo is not. With standard_user, each product shows its own photo.

**Steps to reproduce:**

1. Open https://www.saucedemo.com/.
2. Log in with problem_user / secret_sauce.
3. On Products, compare the src of the six product images.

**Actual result:** All six images use the same src, a file whose name contains sl-404.

**Expected result:** Each product shows its own photo.

**Severity:** Minor

**Screenshots:** None.
