import { test, expect } from '@playwright/test';

test('handling tables and pagination', async ({ page }) => {
await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/table-pagination');
await expect(page.getByRole('heading', { name: 'Filter Controls' })).toBeVisible();
// const rowCount = await page.locator('tbody tr').count()
// console.log("table row count" + rowCount)
// const rowFirst = await page.locator('tbody tr').first().allTextContents()
// console.log("First row data" + rowFirst)
const firstRowFirstColumn =  await page.locator('tbody tr td:nth-child(1)').nth(0).allTextContents()
console.log(firstRowFirstColumn)
});

test('test', async ({ page }) => {
test.setTimeout(180000)
//open the page
await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/table-pagination');
await expect(page.getByRole('heading', { name: 'Filter Controls' })).toBeVisible();
const obj:{[key: string]: string[]} = {}
//{LRN001: ["LRN001", "Learner 0001", "QA Engineer"...]}

//select 100 rows per page
await page.getByTestId('page-size-select').selectOption('100')

while(true){
const rowCount = await page.locator('tbody tr').count()
 for(let j = 0; j< rowCount; j++){
    const row = await page.locator('table tr').nth(j).locator('td').allTextContents()
    obj[row[0]]= row
 }
if(await page.getByTestId('pagination-next').isDisabled()){
    break
}

await page.getByTestId('pagination-next').click()
}
console.log(JSON.stringify(obj, null, 2))
});