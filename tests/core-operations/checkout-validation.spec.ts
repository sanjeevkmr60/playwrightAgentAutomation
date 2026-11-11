// spec: specs/saucedemo-core-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Core shopper operations', () => {
  test('Block checkout when required information is missing', async ({ page }) => {
    // 1. In a fresh browser state, open the site, sign in with standard_user / secret_sauce, add Sauce Labs Backpack to the cart, and open the cart.
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('[data-test="item-4-title-link"]').click();
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await page.getByRole('button', { name: 'Cart, 1 items' }).click();
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.locator('.cart_quantity')).toHaveText('1');

    // 2. Select Checkout and leave First Name, Last Name, and Zip/Postal Code blank.
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page.getByText('Checkout: Your Information', { exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Zip/Postal Code' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();

    // 3. Select Continue without entering any information.
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('alert')).toContainText('Error: First Name is required');
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(page.getByText('Checkout: Your Information', { exact: true })).toBeVisible();
  });
});
