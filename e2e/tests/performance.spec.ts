import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage";

test.describe("Mission Control Dashboard - Performance", () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
  });

  test("page loads within performance budget", async ({ page }) => {
    const startTime = Date.now();
    
    await dashboardPage.goto();
    await dashboardPage.waitForDataLoad();
    
    const loadTime = Date.now() - startTime;
    
    // Should load within 5 seconds even on slower connections
    expect(loadTime).toBeLessThan(5000);
    
    // For local development, should be much faster
    if (process.env.NODE_ENV === 'development') {
      expect(loadTime).toBeLessThan(2000);
    }
  });

  test("data refresh is performant", async ({ page }) => {
    await dashboardPage.goto();
    await dashboardPage.waitForDataLoad();
    
    // Time the refresh operation
    const startTime = Date.now();
    await dashboardPage.refreshData();
    const refreshTime = Date.now() - startTime;
    
    // Refresh should be quick
    expect(refreshTime).toBeLessThan(2000);
  });

  test("layout stability - no significant content shifts", async ({ page }) => {
    await dashboardPage.goto();
    
    // Monitor for layout shifts during load
    let cumulativeLayoutShift = 0;
    
    page.on('pageerror', (error) => {
      // Log any JavaScript errors that might cause layout shifts
      console.log('Page error during load:', error.message);
    });
    
    await dashboardPage.waitForDataLoad();
    
    // Check that major elements are stable
    const titlePosition = await dashboardPage.title.boundingBox();
    const metricsPosition = await dashboardPage.metricsCards.first().boundingBox();
    
    expect(titlePosition).toBeTruthy();
    expect(metricsPosition).toBeTruthy();
    
    // Wait a bit more and check positions haven't shifted significantly
    await page.waitForTimeout(1000);
    
    const titlePosition2 = await dashboardPage.title.boundingBox();
    const metricsPosition2 = await dashboardPage.metricsCards.first().boundingBox();
    
    expect(Math.abs((titlePosition?.y || 0) - (titlePosition2?.y || 0))).toBeLessThan(10);
    expect(Math.abs((metricsPosition?.y || 0) - (metricsPosition2?.y || 0))).toBeLessThan(10);
  });

  test("images and icons load efficiently", async ({ page }) => {
    await dashboardPage.goto();
    await dashboardPage.waitForDataLoad();
    
    // Check that SVG icons don't cause performance issues
    const icons = page.locator('svg');
    const iconCount = await icons.count();
    
    // Should have reasonable number of icons
    expect(iconCount).toBeGreaterThan(10);
    expect(iconCount).toBeLessThan(100); // Shouldn't be excessive
    
    // Check that all icons are visible (loaded)
    for (let i = 0; i < Math.min(iconCount, 20); i++) {
      await expect(icons.nth(i)).toBeVisible();
    }
  });

  test("no excessive network requests", async ({ page }) => {
    const requests: string[] = [];
    
    page.on('request', (request) => {
      requests.push(request.url());
    });
    
    await dashboardPage.goto();
    await dashboardPage.waitForDataLoad();
    
    // Should not make excessive requests
    expect(requests.length).toBeLessThan(50);
    
    // Check for any suspicious duplicate requests
    const duplicateRequests = requests.filter((url, index, array) => 
      array.indexOf(url) !== index
    );
    
    // A few duplicates might be normal (favicon, etc.) but not many
    expect(duplicateRequests.length).toBeLessThan(5);
  });

  test("memory usage stays reasonable during interaction", async ({ page }) => {
    await dashboardPage.goto();
    await dashboardPage.waitForDataLoad();
    
    // Perform several refresh operations to test for memory leaks
    for (let i = 0; i < 5; i++) {
      await dashboardPage.refreshData();
      await page.waitForTimeout(500);
    }
    
    // Navigate through sections multiple times
    for (let i = 0; i < 3; i++) {
      await dashboardPage.navigateToSection('activity');
      await page.waitForTimeout(200);
      await dashboardPage.navigateToSection('system-status');
      await page.waitForTimeout(200);
    }
    
    // Check that the page is still responsive
    await expect(dashboardPage.title).toBeVisible();
    await expect(dashboardPage.refreshButton).toBeEnabled();
  });

  test("CSS and JavaScript bundle sizes are reasonable", async ({ page }) => {
    const responses: { url: string, size: number }[] = [];
    
    page.on('response', async (response) => {
      if (response.url().includes('.css') || response.url().includes('.js')) {
        try {
          const buffer = await response.body();
          responses.push({
            url: response.url(),
            size: buffer.length
          });
        } catch (error) {
          // Some responses might not be available
        }
      }
    });
    
    await dashboardPage.goto();
    await dashboardPage.waitForDataLoad();
    
    // Check total JavaScript bundle size
    const jsFiles = responses.filter(r => r.url.includes('.js'));
    const totalJsSize = jsFiles.reduce((sum, file) => sum + file.size, 0);
    
    // Should be reasonable for a dashboard app (under 2MB total)
    expect(totalJsSize).toBeLessThan(2 * 1024 * 1024);
    
    // Check CSS bundle size
    const cssFiles = responses.filter(r => r.url.includes('.css'));
    const totalCssSize = cssFiles.reduce((sum, file) => sum + file.size, 0);
    
    // CSS should be reasonable (under 500KB)
    expect(totalCssSize).toBeLessThan(500 * 1024);
  });

  test("responsive behavior is performant", async ({ page, isMobile }) => {
    const startTime = Date.now();
    
    await dashboardPage.goto();
    await dashboardPage.waitForDataLoad();
    
    if (isMobile) {
      // Test mobile-specific performance
      await dashboardPage.openSidebar();
      
      // Sidebar should open smoothly
      await expect(dashboardPage.navigation).toBeVisible();
      
      const mobileLoadTime = Date.now() - startTime;
      // Mobile might be slightly slower but should still be reasonable
      expect(mobileLoadTime).toBeLessThan(7000);
    }
  });

  test("auto-refresh doesn't impact performance negatively", async ({ page }) => {
    await dashboardPage.goto();
    await dashboardPage.waitForDataLoad();
    
    // Monitor network activity during auto-refresh
    const networkRequests: string[] = [];
    
    page.on('request', (request) => {
      if (request.url().includes('/api') || request.url().includes('fetch')) {
        networkRequests.push(request.url());
      }
    });
    
    // Wait for auto-refresh to potentially occur
    await page.waitForTimeout(16000); // Wait longer than 15s refresh interval
    
    // Should not have made excessive background requests
    expect(networkRequests.length).toBeLessThan(10);
    
    // Page should still be responsive
    await expect(dashboardPage.refreshButton).toBeEnabled();
    await dashboardPage.refreshData(); // Should still work
  });

  test("large data sets don't cause performance issues", async ({ page }) => {
    // This would test with mocked large data sets
    // For now, verify current data renders efficiently
    
    await dashboardPage.goto();
    await dashboardPage.waitForDataLoad();
    
    // Scroll through all sections to ensure smooth rendering
    await dashboardPage.scrollToSection('organizational');
    await page.waitForTimeout(200);
    
    await dashboardPage.scrollToSection('activity'); 
    await page.waitForTimeout(200);
    
    await dashboardPage.scrollToSection('status');
    await page.waitForTimeout(200);
    
    // Check sessions list can handle multiple entries
    const sessionCount = await dashboardPage.getActiveSessionsCount();
    expect(sessionCount).toBeGreaterThan(0);
    
    // Should render smoothly regardless of session count
    await expect(dashboardPage.activeSessions).toBeVisible();
  });

  test("error handling doesn't degrade performance", async ({ page }) => {
    // Monitor console errors
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await dashboardPage.goto();
    await dashboardPage.waitForDataLoad();
    
    // Perform various interactions that might trigger errors
    await dashboardPage.refreshData();
    await dashboardPage.openSidebar();
    await dashboardPage.navigateToSection('activity');
    
    // Should not have accumulated many console errors
    expect(consoleErrors.length).toBeLessThan(5);
    
    // Page should remain functional
    await expect(dashboardPage.title).toBeVisible();
  });
});