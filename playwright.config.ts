import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["json", { outputFile: "test-results.json" }],
    ["junit", { outputFile: "results.xml" }]
  ],
  use: {
    baseURL: "http://localhost:3001", // Use local static server for testing
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    // Accessibility testing
    colorScheme: 'light',
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox", 
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"] },
    },
    {
      name: "mobile-android",
      use: { ...devices["Pixel 5"] },
    },
    // Dark mode testing
    {
      name: "dark-mode",
      use: { 
        ...devices["Desktop Chrome"],
        colorScheme: 'dark',
      },
    }
  ],
  webServer: {
    command: 'npx http-server out -p 3001',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
    timeout: 30000
  }
});