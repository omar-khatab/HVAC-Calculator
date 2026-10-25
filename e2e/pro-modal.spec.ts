import { test, expect, Page } from '@playwright/test';

const TITLE = 'Pro features coming soon';

const modalBtn = (page: Page) => page.getByTestId('get-pro').filter({ visible: true });
const dialogTitle = (page: Page) => page.getByRole('heading', { name: TITLE });
const closeBtn = (page: Page) => page.getByTestId('pro-modal-close');
const overlay = (page: Page) => page.getByTestId('pro-modal-overlay');

test.describe('Get Pro modal (desktop)', () => {
  test.use({ viewport: { width: 1280, height: 720 }});
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test('modal is hidden initially', async ({ page }) => {
    await expect(dialogTitle(page)).toBeHidden();
  });

  test('opens from Get Pro button', async ({ page }) => {
    await modalBtn(page).click();
    await expect(dialogTitle(page)).toBeVisible();
    await expect(page.getByText('Export to PDF, SMACNA tables')).toBeVisible();
  });

  test('closes with close button', async ({ page }) => {
    await modalBtn(page).click();
    await expect(dialogTitle(page)).toBeVisible();
    await closeBtn(page).click();
    await expect(dialogTitle(page)).toBeHidden();
  });

  test('closes by clicking overlay', async ({ page }) => {
    await modalBtn(page).click();
    await expect(dialogTitle(page)).toBeVisible();
    await overlay(page).click({ position: { x: 5, y: 5 } });
    await expect(dialogTitle(page)).toBeHidden();
  });

  test('closes with escape key', async ({ page }) => {
    await modalBtn(page).click();
    await expect(dialogTitle(page)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialogTitle(page)).toBeHidden();
  });

  test('clicking inside card does not close', async ({ page }) => {
    await modalBtn(page).click();
    await dialogTitle(page).click();
    await expect(dialogTitle(page)).toBeVisible();
  });
});

test.describe('Get Pro modal (mobile)', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('opens from burger menu and closes menu', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('mobile-burger').click();
    const link = page.getByRole('link', { name: "DuctSizer" });
    await expect(link).toBeVisible();
    await modalBtn(page).click();
    await expect(dialogTitle(page)).toBeVisible();
    await expect(link).toBeHidden();
  });
});