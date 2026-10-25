import { test, expect } from '@playwright/test';

test.describe('Navigation (desktop)', () => {
  test('Navigate between pages', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'BTUCalculator' }).click();
    await expect(page).toHaveURL('BTUCalculator');
    await expect(page.getByRole('heading', { name: 'BTU CALCULATOR - QUICK COOLING LOAD' })).toBeVisible();

    await page.getByRole('link', { name: 'DuctSizer' }).click();
    await expect(page).toHaveURL('DuctSizer');
    await expect(page.getByRole('heading', { name: 'DUCT SIZER' })).toBeVisible();

    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL('/');
  });

  test('Logo redirects to home', async ({ page }) => {
    await page.goto('/BTUCalculator');
    await page.getByRole('link', { name: 'hvac-calculator Logo' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'HVAC Engineering Calculator' })).toBeVisible();
  });
});

test.describe('Navigation (mobile)', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('Mobile burger menu', async ({ page }) => {
    await page.goto('/');
    const ductLink = page.getByRole('link', { name: 'DuctSizer' });
    await expect(ductLink).toBeHidden();               
    await page.getByTestId('mobile-burger').click();
    await expect(ductLink).toBeVisible();              
    await page.getByRole('link', { name: 'BTUCalculator' }).click();
    await expect(page).toHaveURL('BTUCalculator');
    await expect(ductLink).toBeHidden();   
  });
});