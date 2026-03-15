import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage";

test.describe("Mission Control Dashboard - Visual Regression", () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await dashboardPage.waitForDataLoad();
    
    // Wait for animations to settle
    await page.waitForTimeout(1000);
  });

  test("dashboard homepage visual baseline", async ({ page }) => {
    // Take full page screenshot
    await expect(page).toHaveScreenshot("dashboard-homepage.png", {
      fullPage: true,
      maxDiffPixels: 1000, // Allow for small dynamic data changes
    });
  });

  test("header and navigation visual consistency", async ({ page }) => {
    await expect(dashboardPage.header).toHaveScreenshot("header-navigation.png", {
      maxDiffPixels: 200,
    });
  });

  test("metrics cards layout and design", async ({ page }) => {
    await expect(dashboardPage.metricsCards.first()).toHaveScreenshot("metrics-cards.png", {
      maxDiffPixels: 300, // Numbers may change
    });
  });

  test("organizational overview section", async ({ page }) => {
    await dashboardPage.scrollToSection('organizational');
    
    await expect(dashboardPage.organizationalOverview).toHaveScreenshot("organizational-overview.png", {
      maxDiffPixels: 400,
    });
  });

  test("department status cards", async ({ page }) => {
    await dashboardPage.scrollToSection('organizational');
    
    // Software Department
    await expect(dashboardPage.softwareDepartment).toHaveScreenshot("software-department.png", {
      maxDiffPixels: 100,
    });
    
    // Content Department
    await expect(dashboardPage.contentDepartment).toHaveScreenshot("content-department.png", {
      maxDiffPixels: 100,
    });
    
    // Mercor Division
    await expect(dashboardPage.mercorDivision).toHaveScreenshot("mercor-division.png", {
      maxDiffPixels: 100,
    });
  });

  test("info blocks visual consistency", async ({ page }) => {
    // Workload block
    await expect(dashboardPage.workloadInfoBlock).toHaveScreenshot("workload-info-block.png", {
      maxDiffPixels: 200,
    });
    
    // Performance block
    await expect(dashboardPage.performanceInfoBlock).toHaveScreenshot("performance-info-block.png", {
      maxDiffPixels: 200,
    });
    
    // Gateway health block
    await expect(dashboardPage.gatewayHealthBlock).toHaveScreenshot("gateway-health-block.png", {
      maxDiffPixels: 200,
    });
  });

  test("active sessions panel", async ({ page }) => {
    await expect(dashboardPage.activeSessions).toHaveScreenshot("active-sessions.png", {
      maxDiffPixels: 400, // Session data may vary
    });
  });

  test("recent activity panel", async ({ page }) => {
    await dashboardPage.scrollToSection('activity');
    
    await expect(dashboardPage.recentActivity).toHaveScreenshot("recent-activity.png", {
      maxDiffPixels: 400, // Activity timestamps will change
    });
  });

  test("system status bar", async ({ page }) => {
    await dashboardPage.scrollToSection('status');
    
    await expect(dashboardPage.systemStatusBar).toHaveScreenshot("system-status-bar.png", {
      maxDiffPixels: 300, // CPU/memory values may change
    });
  });

  test("sidebar navigation design", async ({ page }) => {
    await dashboardPage.openSidebar();
    
    await expect(dashboardPage.navigation).toHaveScreenshot("sidebar-navigation.png", {
      maxDiffPixels: 100,
    });
  });

  test("mobile responsive layout", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile-specific visual test");
    
    await expect(page).toHaveScreenshot("dashboard-mobile.png", {
      fullPage: true,
      maxDiffPixels: 1000,
    });
  });

  test("mobile sidebar navigation", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile-specific visual test");
    
    await dashboardPage.openSidebar();
    
    await expect(page).toHaveScreenshot("mobile-sidebar.png", {
      fullPage: true,
      maxDiffPixels: 200,
    });
  });

  test("button and interactive element states", async ({ page }) => {
    // Refresh button default state
    await expect(dashboardPage.refreshButton).toHaveScreenshot("refresh-button-default.png");
    
    // Hover state
    await dashboardPage.refreshButton.hover();
    await expect(dashboardPage.refreshButton).toHaveScreenshot("refresh-button-hover.png");
    
    // View Full Chart button
    await dashboardPage.scrollToSection('organizational');
    await expect(dashboardPage.viewFullChartButton).toHaveScreenshot("view-chart-button.png");
  });

  test("loading state visual consistency", async ({ page }) => {
    // Navigate to fresh page to capture loading state
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    const loadingIndicator = page.locator('text=Loading Mission Control...');
    
    if (await loadingIndicator.isVisible()) {
      await expect(loadingIndicator.locator('..').locator('..')).toHaveScreenshot("loading-state.png", {
        maxDiffPixels: 100,
      });
    }
    
    await dashboardPage.waitForDataLoad();
  });

  test("color scheme and theming consistency", async ({ page }) => {
    // Test different sections for color consistency
    const sections = [
      { element: dashboardPage.metricsCards.first(), name: "metrics-colors" },
      { element: dashboardPage.softwareDepartment, name: "software-dept-colors" },
      { element: dashboardPage.contentDepartment, name: "content-dept-colors" },
      { element: dashboardPage.mercorDivision, name: "mercor-div-colors" }
    ];
    
    for (const section of sections) {
      await section.element.scrollIntoView();
      await expect(section.element).toHaveScreenshot(`${section.name}.png`, {
        maxDiffPixels: 100,
      });
    }
  });

  test("dark mode appearance", async ({ page, colorScheme }) => {
    test.skip(colorScheme !== 'dark', "Dark mode specific test");
    
    await expect(page).toHaveScreenshot("dashboard-dark-mode.png", {
      fullPage: true,
      maxDiffPixels: 1500, // May have more differences in dark mode
    });
  });

  test("accessibility indicators visual design", async ({ page }) => {
    // Status indicators and badges
    const statusElements = page.locator('text=Operational, [class*="bg-emerald"], [class*="bg-green"]');
    const firstStatus = statusElements.first();
    
    await expect(firstStatus).toHaveScreenshot("status-indicator.png");
    
    // Live data indicator
    await expect(dashboardPage.liveDataIndicator).toHaveScreenshot("live-data-indicator.png");
  });

  test("typography and text rendering", async ({ page }) => {
    // Main title typography
    await expect(dashboardPage.title).toHaveScreenshot("main-title-typography.png");
    
    // Section headers
    const organizationalTitle = page.locator('text=Organizational Structure');
    await organizationalTitle.scrollIntoView();
    await expect(organizationalTitle).toHaveScreenshot("section-header-typography.png");
  });

  test("animation states", async ({ page }) => {
    // Refresh animation (if any)
    await dashboardPage.refreshButton.click();
    
    // Capture any loading/refreshing visual state
    const refreshingState = page.locator('text=Refreshing...');
    if (await refreshingState.isVisible()) {
      await expect(refreshingState).toHaveScreenshot("refreshing-animation.png");
    }
    
    // Wait for completion
    await page.waitForTimeout(1000);
  });

  test("edge cases and data states", async ({ page }) => {
    // This would test with various data states
    // For now, test current data visualization
    
    // High usage metrics visualization
    await expect(dashboardPage.metricsCards).toHaveScreenshot("metrics-data-visualization.png", {
      maxDiffPixels: 500,
    });
  });

  test("cross-browser rendering consistency", async ({ page, browserName }) => {
    // Browser-specific visual tests
    await expect(page).toHaveScreenshot(`dashboard-${browserName}.png`, {
      fullPage: true,
      maxDiffPixels: 1200, // Allow for browser rendering differences
    });
  });

  test("icon and svg rendering", async ({ page }) => {
    // Test that all SVG icons render consistently
    const icons = page.locator('svg').first();
    await expect(icons).toHaveScreenshot("icon-rendering.png");
    
    // Department icons
    await dashboardPage.scrollToSection('organizational');
    const deptIcons = dashboardPage.softwareDepartment.locator('svg').first();
    await expect(deptIcons).toHaveScreenshot("department-icon.png");
  });
});