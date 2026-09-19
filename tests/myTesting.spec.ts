import {test, expect} from '@playwright/test'

test ('User login', async({page}) =>{
    await page.goto('https://www.saucedemo.com/')
    await page.locator('[placeholder="Username"]').fill('standard_user')
    await page.locator('[placeholder="Password"]').fill('secret_sauce')
})

