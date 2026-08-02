import { test, expect } from '@playwright/test';

test('SylvieApp homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'SylvieApp' }).first()).toBeVisible();
});
