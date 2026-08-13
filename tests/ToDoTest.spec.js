const { test, expect } = require('@playwright/test');

// Basic test case to check if the app loads properly
test('should load the page correctly', async ({ page }) => {
  // Navigate to your app URL (update port/path as needed)
  await page.goto('http://127.0.0.1:5500/index.html');

  // Assert page title or an expected element
  await expect(page).toHaveTitle(/To-Do/i);
});

/** 
(async () => {
  // headless: true bedeutet, der Browser läuft im Hintergrund ohne sichtbares Fenster
  const browser = await chromium.launch({ 
    headless: false,
    slowMo:500
});
  const page = await browser.newPage();

  // Viewport-Größe festlegen
  await page.setViewportSize({ width: 2560, height: 1440});

  // 1. Startseite aufrufen und Screenshot aufnehmen
  await page.goto('https://yunxiaowang2026.github.io/qa-showcase/');
  await page.screenshot({ path: 'screenshots/01_screenshot.png', fullPage: true });
    // 3. ToDo eingeben und einfügen
  console.log(await page.evaluate(() => localStorage.length));
  await page.locator('#todoInput').fill('Einkaufen');
  await page.locator('#addBtn').click();
  console.log(await page.evaluate(() => localStorage.length));

  await browser.close();
})();*/