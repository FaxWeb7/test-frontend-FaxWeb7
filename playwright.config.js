const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  expect: {
    timeout: 10000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.1,
    },
  },
  testDir: "./tests/integration",
  fullyParallel: true,
  retries: 1,
  workers: 5,
  use: {
    baseURL: "http://127.0.0.1:8080",
    trace: "on-first-retry",
    testIdAttribute: 'test-id',
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run http-server",
    url: "http://127.0.0.1:8080",
    reuseExistingServer: !process.env.CI,
  },
});
