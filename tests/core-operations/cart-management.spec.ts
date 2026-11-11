import { test, expect } from '@playwright/test';

test.describe('Core shopper operations', () => {
  test('Add a product and verify the cart', async ({ page }) => {
    // 1. In a fresh browser state, sign in with standard_user / secret_sauce and open the Sauce Labs Backpack details.
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();

    // 2. Select Add to cart.
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();

    // 3. Open the cart.
    await page.getByRole('button', { name: 'Cart, 1 items' }).click();
    await expect(page.getByText('Your Cart', { exact: true })).toBeVisible();
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.locator('.cart_quantity')).toHaveText('1');
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();
  });
});