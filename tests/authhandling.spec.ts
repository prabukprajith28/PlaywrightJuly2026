import { test, expect, Browser, BrowserContext, Page, chromium } from '@playwright/test'

test.describe('Authentication handling to skip multiple login', () => {
    let browser: Browser
    let context: BrowserContext
    let page: Page

    test.beforeAll(async () => {

        browser = await chromium.launch()
        context = await browser.newContext()
        page = await context.newPage()

        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').click();
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await page.waitForURL('https://www.saucedemo.com/inventory.html')
        await context.storageState({ path: 'storage.json' })
        await browser.close()
    })
    test.beforeEach(async () => {
        browser = await chromium.launch()
        context = await browser.newContext({ storageState: 'storage.json' })
        page = await context.newPage()
        await page.goto('https://www.saucedemo.com/inventory.html')
    })

    test.afterEach(async () => {
        await page.close()
        await context.close()
    })

    test('validate the home page', async () => {
        await expect(page.locator('.app_logo')).toBeVisible()
    })
})