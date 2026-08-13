const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  use: {
    // Base URL matching your local Live Server address
    baseURL: 'http://127.0.0.1:5500',
    headless: false,
  },

  // Launch a CLI server automatically for Playwright and CI environment
  webServer: {
    command: 'npx http-server . -p 5500',
    url: 'http://127.0.0.1:5500',
    
    // If Live Server is already running locally, reuse it!
    // In CI environments, Playwright will automatically start its own server.
    reuseExistingServer: !process.env.CI,
  },
});