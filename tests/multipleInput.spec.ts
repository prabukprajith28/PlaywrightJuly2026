import { test, expect } from '@playwright/test';

test('multiple input tests', async ({ page }) => {

  const users =[{username:'standard_user', password: "secret_sauce", expected: "Sauce Labs Backpack"},
    {username:'problem_user', password: "secret_sauce", expected: "Sauce Labs Bike Light"}
  ]

  for(const user of users){
      await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(user.username);
  await page.locator('[data-test="password"]').fill(user.password);
  await page.locator('[data-test="login-button"]').click();
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.getByText(user.expected)).toBeVisible()
  }
});