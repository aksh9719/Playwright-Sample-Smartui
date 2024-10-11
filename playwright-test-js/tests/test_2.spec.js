const { test } = require('../lambdatest-setup');
const { expect } = require('@playwright/test');
const smartuiSnapshot = require("@lambdatest/playwright-driver");

test.describe('Browse Lufthansa in different search engines', () => {
  test('Search Lufthansa', async ({ page }) => {
    try {
      await page.goto('https://www.lufthansa.com/in/en/homepage');
      let element = await page.locator("//*[@id=\"cm-acceptAll\"]");
      await element.click();
      await page.waitForTimeout(15000);
      await smartuiSnapshot.smartuiSnapshot(page, "LT1");

      await page.evaluate(() => {
            window.scrollBy(0, 500); // Scroll down 500 pixels
          });
      let element2 = await page.locator('//*[@class="overlay-header-text display-alignment" and text()="Check-in"]');
      await element2.click();
      await page.waitForTimeout(10000);
      await smartuiSnapshot.smartuiSnapshot(page, "LT");
    } catch (error) {
      console.error("An error occurred:", error);
      // Optionally, you can handle specific error cases here
    }
  });
});