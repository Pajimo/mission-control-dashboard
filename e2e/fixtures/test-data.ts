import { test as base } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage";

// Extend the basic test with our fixtures
export const test = base.extend<{
  dashboardPage: DashboardPage;
  mockData: any;
}>({
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  mockData: async ({ page }, use) => {
    // Mock API responses for consistent testing
    await page.route('**/api/**', async (route) => {
      const url = route.request().url();
      
      if (url.includes('/sessions')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            sessions: [
              {
                id: 'test-main',
                title: 'Test CEO Session',
                channel: 'webchat',
                model: 'Claude Sonnet 4',
                tokensUsed: 45000,
                tokensMax: 200000,
                lastActive: new Date().toISOString(),
                isMain: true
              },
              {
                id: 'test-bobo',
                title: 'Test CTO Session',
                channel: 'agent', 
                model: 'Claude Sonnet 4',
                tokensUsed: 28000,
                tokensMax: 200000,
                lastActive: new Date(Date.now() - 60000).toISOString(),
                isMain: false
              }
            ]
          })
        });
      } else if (url.includes('/health')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            cpuUsage: 25.5,
            memoryUsage: 42.3,
            uptime: '5d 12h 34m',
            gatewayStatus: 'operational'
          })
        });
      } else {
        // Pass through other requests
        await route.continue();
      }
    });

    await use({});
  },
});

export { expect } from '@playwright/test';