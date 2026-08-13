const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  // Directory where test files are located
  testDir: './tests',
  
  use: {
    // Run tests in headed mode to see the browser UI
    headless: false,
  },
});