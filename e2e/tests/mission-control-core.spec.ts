import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage";

test.describe("Mission Control Dashboard - Core Functionality", () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await dashboardPage.waitForDataLoad();
  });

  test("loads and displays main dashboard elements", async () => {
    // Verify header and title
    await expect(dashboardPage.title).toBeVisible();
    await expect(dashboardPage.title).toContainText("OpenClaw Mission Control");
    
    // Verify live data indicator is present
    await expect(dashboardPage.liveDataIndicator).toBeVisible();
    await expect(dashboardPage.liveDataIndicator).toContainText("Live Data Active");
    
    // Verify navigation is present
    await expect(dashboardPage.navigation).toBeVisible();
    await expect(dashboardPage.navDashboard).toBeVisible();
    await expect(dashboardPage.navAgents).toBeVisible();
    await expect(dashboardPage.navOrgChart).toBeVisible();
  });

  test("displays all metric cards with data", async () => {
    const metrics = await dashboardPage.getMetricValues();
    
    // Should have 4 main metrics
    expect(metrics).toHaveLength(4);
    
    // Verify metric types are present
    const metricTitles = metrics.map(m => m.title?.toLowerCase()).filter(Boolean);
    expect(metricTitles.some(title => title?.includes('agents'))).toBe(true);
    expect(metricTitles.some(title => title?.includes('tasks') || title?.includes('progress'))).toBe(true);
    expect(metricTitles.some(title => title?.includes('error'))).toBe(true);
    expect(metricTitles.some(title => title?.includes('completion') || title?.includes('speed'))).toBe(true);
    
    // Verify all metrics have numeric values
    for (const metric of metrics) {
      expect(metric.value).toBeTruthy();
      expect(metric.value).not.toBe("0"); // Should have real data
    }
  });

  test("organizational overview displays all departments", async () => {
    // Scroll to organizational section
    await dashboardPage.scrollToSection('organizational');
    
    // Verify organizational overview is visible
    await expect(dashboardPage.organizationalOverview).toBeVisible();
    
    // Check all three departments
    await expect(dashboardPage.softwareDepartment).toBeVisible();
    await expect(dashboardPage.contentDepartment).toBeVisible(); 
    await expect(dashboardPage.mercorDivision).toBeVisible();
    
    // Check CEO overview
    await expect(dashboardPage.ceoOverview).toBeVisible();
    await expect(dashboardPage.viewFullChartButton).toBeVisible();
    
    // Verify department operational status
    const departments = await dashboardPage.getDepartmentStatuses();
    expect(departments).toHaveLength(3);
    
    for (const dept of departments) {
      expect(dept.operational).toBe(true);
    }
  });

  test("info blocks display workload, performance, and gateway data", async () => {
    // Verify all info blocks are visible
    await expect(dashboardPage.workloadInfoBlock).toBeVisible();
    await expect(dashboardPage.performanceInfoBlock).toBeVisible();
    await expect(dashboardPage.gatewayHealthBlock).toBeVisible();
    
    // Check workload data
    await expect(dashboardPage.workloadInfoBlock).toContainText("Total work items");
    await expect(dashboardPage.workloadInfoBlock).toContainText("Completed");
    
    // Check performance data
    await expect(dashboardPage.performanceInfoBlock).toContainText("Completed tasks");
    await expect(dashboardPage.performanceInfoBlock).toContainText("Error rate");
    
    // Check gateway health
    await expect(dashboardPage.gatewayHealthBlock).toContainText("Gateway status");
    await expect(dashboardPage.gatewayHealthBlock).toContainText("System uptime");
  });

  test("sessions, activity, and projects sections display data", async () => {
    // Verify active sessions
    await expect(dashboardPage.activeSessions).toBeVisible();
    const sessionCount = await dashboardPage.getActiveSessionsCount();
    expect(sessionCount).toBeGreaterThan(0);
    
    // Verify recent activity
    await expect(dashboardPage.recentActivity).toBeVisible();
    
    // Verify active projects
    await expect(dashboardPage.activeProjects).toBeVisible();
  });

  test("system status bar shows health metrics", async () => {
    await dashboardPage.scrollToSection('status');
    
    await expect(dashboardPage.systemStatusBar).toBeVisible();
    
    const systemHealth = await dashboardPage.getSystemHealth();
    
    // Verify system metrics are displayed
    expect(systemHealth.cpuUsage).toBeTruthy();
    expect(systemHealth.memoryUsage).toBeTruthy();
    expect(systemHealth.networkStatus).toBeTruthy();
    expect(systemHealth.uptime).toBeTruthy();
  });

  test("refresh functionality works", async () => {
    // Get initial timestamp
    const initialTimestamp = await dashboardPage.page.locator('text=Last updated').textContent();
    
    // Wait a moment and refresh
    await dashboardPage.page.waitForTimeout(2000);
    await dashboardPage.refreshData();
    
    // Verify timestamp changed
    const newTimestamp = await dashboardPage.page.locator('text=Last updated').textContent();
    expect(newTimestamp).not.toBe(initialTimestamp);
  });

  test("navigation elements are functional", async () => {
    // Test sidebar toggle
    await dashboardPage.openSidebar();
    
    // Test navigation to different sections
    await dashboardPage.navigateToSection('activity');
    await expect(dashboardPage.recentActivity).toBeInViewport();
    
    await dashboardPage.navigateToSection('system-status');
    await expect(dashboardPage.systemStatusBar).toBeInViewport();
  });

  test("responsive behavior on mobile", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile-specific test");
    
    // Verify mobile-specific elements
    await expect(dashboardPage.sidebarToggle).toBeVisible();
    
    // Test mobile navigation
    await dashboardPage.openSidebar();
    await expect(dashboardPage.navigation).toBeVisible();
  });

  test("external links work correctly", async ({ page }) => {
    // Test "View Full Chart" link
    await dashboardPage.scrollToSection('organizational');
    
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      dashboardPage.viewFullChartButton.click()
    ]);
    
    // Verify new page opened (would be org chart page)
    expect(newPage.url()).toContain('chart');
    await newPage.close();
  });

  test("data auto-refresh indication works", async () => {
    // Verify live data indicator
    await expect(dashboardPage.liveDataIndicator).toBeVisible();
    
    // Check for refresh button availability
    await expect(dashboardPage.refreshButton).toBeEnabled();
    
    // Test manual refresh
    await dashboardPage.refreshButton.click();
    
    // Should show "Refreshing..." state briefly
    await expect(dashboardPage.refreshButton).toContainText("Refresh");
  });
});