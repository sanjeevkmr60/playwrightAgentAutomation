import { test, expect } from '@playwright/test';

test.describe('Core shopper operations', () => {
  test('Browse, sort, and inspect a product', async ({ page }) => {
    // 1. In a fresh browser state, open the site and sign in with standard_user / secret_sauce.
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await expect(page.getByRole('combobox', { name: 'Sort products' })).toBeVisible();

    // 2. Select Price (low to high) from Sort products.
    await page.getByRole('combobox', { name: 'Sort products' }).selectOption('lohi');
    await expect(page.getByRole('combobox', { name: 'Sort products' })).toHaveValue('lohi');
    await expect(page.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Onesie');
    await expect(page.locator('.inventory_item_name').last()).toHaveText('Sauce Labs Fleece Jacket');

    // 3. Open the Sauce Labs Backpack product details.
    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.')).toBeVisible();
    await expect(page.getByText('$29.99', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();

    // 4. Select Back to products.
    await page.getByRole('button', { name: 'Back to products' }).click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
  });
});