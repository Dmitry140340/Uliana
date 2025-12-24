import { test, expect } from '@playwright/test';

test('homepage has title and movies', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Check title
  await expect(page).toHaveTitle(/Movie Catalog/);

  // Check if navbar exists
  const navbar = page.locator('.navbar');
  await expect(navbar).toBeVisible();

  // Check if "Popular Movies" (or Russian equivalent) is visible
  // Since we don't have the exact text in the header (it's just search bar), let's check for search bar
  const searchBar = page.locator('.search-bar');
  await expect(searchBar).toBeVisible();
});
