import { test, expect } from '@playwright/test';

test.describe('basic sandbox', () => {
  const baseUrl = 'https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic';
  const advancedUrl = 'https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced';
  test('Click, double click, hover, tooltip, static dropdown', async ({ page }) => {
    await page.goto(baseUrl);
    await page.getByTestId('single-click-btn').click();
    await expect(page.getByText('Single click completed.')).toBeVisible();
    await page.getByTestId('double-click-btn').dblclick();
    await expect(page.getByText('Double click completed.')).toBeVisible();
    await page.getByTestId('hover-btn').hover();
    await expect(page.getByText('Hover triggered successfully.')).toBeVisible();
    await page.getByTestId('tooltip-trigger-btn').hover();
    await expect(page.getByTestId('hover-tooltip')).toContainText('Tooltip verified')
    await expect(page.getByTestId('static-practice-select')).toBeVisible();
    await page.getByTestId('static-practice-select').selectOption('Easy - Basic locator targeting');
    await expect(page.getByText('Static dropdown selected: Easy.')).toBeVisible();
  });

  test('Input, checkbox, radio handling', async ({ page }) => {
    await page.goto(baseUrl);

    const name = 'playwright';
    const email = 'info@test.com';
    const dropdownOption = 'Playwright Core';
    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic');
    await page.getByTestId('name-input').fill(name);
    await page.getByTestId('email-input').fill(email);
    await page.getByTestId('track-select').selectOption(dropdownOption);
    await page.getByTestId('remember-checkbox').check();
    await page.getByTestId('mode-api-radio').check();
    await page.getByTestId('submit-form-btn').click();
    await expect(page.getByText(`${name} submitted (${email}) for ${dropdownOption}`)).toBeVisible();
  });

  test('Dynamic waits, keyboard interactions', async ({ page }) => {
    await page.goto(baseUrl);
    await page.getByTestId('async-load-btn').click();
    await expect(page.getByText('Async result loaded successfully.')).toBeVisible({ timeout: 25000 });
    await page.getByTestId('keyboard-input').type('Hello, Playwright!');
    await page.getByTestId('keyboard-input').press('Enter');
    await expect(page.getByText('Command submitted: Hello, Playwright!')).toBeVisible();
  });

  test('text and attribute extaction', async ({ page }) => {
    await page.goto(baseUrl);
    //extract only visible tests in ui
    const innerText = await page.getByTestId('extract-textcontent-target').innerText();
    console.log('Extracted innerText:', innerText);

    //extract both visible and hidden textContent in ui
    const textContentValue = await page.getByTestId('extract-textcontent-target').textContent();
    console.log('Extracted textContent:', textContentValue);

    //extract value of input field in ui
    const inputValue = await page.getByTestId('extract-inputvalue-target').inputValue();
    console.log('Extracted inputValue:', inputValue);

    const attributeValue = await page.getByTestId('extract-inputvalue-target').getAttribute('class');
    console.log('Extracted attribute value for class:', attributeValue);

    const allInnerText = await page.getByTestId('extract-list').allInnerTexts();
    console.log('Extracted all innerTexts:', allInnerText);

    const allTextContent = await page.getByTestId('extract-list').allTextContents();
    console.log('Extracted all textContents:', allTextContent);
  });


  test('element state verification', async ({ page }) => {
    await page.goto(baseUrl);
    const stateCheck = await page.getByTestId('remember-checkbox').isChecked();
    //isDisabled, isEditable, isEnabled, isHidden, isVisible, isChecked
    console.log('Is checkbox checked:', stateCheck);
    if (stateCheck === false) {
      await page.getByTestId('remember-checkbox').check();
    }
    const stateAfterCheck = await page.getByTestId('remember-checkbox').isChecked();
    console.log('Is checkbox checked after checking:', stateAfterCheck);
  })

  test('verify the dropdown state', async ({ page }) => {
    await page.goto(advancedUrl);
    const dropdownState = await page.getByTestId('dynamic-option-select').isDisabled();
    console.log('Is dropdown enabled:', dropdownState);
    const isVisible = await page.getByTestId('hidden-dropdown-select').isVisible();
    console.log('Is dropdown visible:', isVisible);
        await expect(page.getByText('Hidden dropdown selected: Hidden - Advanced.')).not.toBeVisible();
    if (isVisible === false) {
      await page.getByTestId('hidden-dropdown-toggle-btn').click();
    }

    const isVisibleAfterClick = await page.getByTestId('hidden-dropdown-select').isVisible();
    console.log('Is dropdown visible after clicking toggle button:', isVisibleAfterClick);
    await page.getByTestId('hidden-dropdown-select').selectOption('Hidden - Advanced');
    await expect(page.getByText('Hidden dropdown selected: Hidden - Advanced.')).toBeVisible();
  });
  

})
