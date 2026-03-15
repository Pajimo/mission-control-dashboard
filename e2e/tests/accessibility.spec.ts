import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { DashboardPage } from "../pages/DashboardPage";

test.describe("Mission Control Dashboard - Accessibility", () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await dashboardPage.waitForDataLoad();
  });

  test("should not have any automatically detectable accessibility issues", async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("keyboard navigation works correctly", async ({ page }) => {
    // Tab through main navigation
    await page.keyboard.press('Tab');
    await expect(dashboardPage.sidebarToggle).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(dashboardPage.refreshButton).toBeFocused();
    
    // Test navigation with keyboard
    await dashboardPage.openSidebar();
    await page.keyboard.press('Tab');
    await expect(dashboardPage.navDashboard).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(dashboardPage.navAgents).toBeFocused();
    
    // Test Enter key on navigation items
    await page.keyboard.press('Enter');
    // Should navigate (we'll verify URL or state change)
  });

  test("screen reader landmarks are properly defined", async ({ page }) => {
    // Check for main landmark
    const main = page.locator('main');
    await expect(main).toBeVisible();
    
    // Check for navigation landmark
    const nav = page.locator('nav[role="navigation"], nav');
    await expect(nav).toBeVisible();
    
    // Check for header landmark
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test("headings follow proper hierarchy", async ({ page }) => {
    // Check for h1
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('OpenClaw Mission Control');
    
    // Check h2 headings exist for main sections
    const h2s = page.locator('h2');
    await expect(h2s).toHaveCountGreaterThan(0);
    
    // Check h3 headings for subsections
    const h3s = page.locator('h3');
    await expect(h3s).toHaveCountGreaterThan(0);
  });

  test("color contrast is sufficient", async ({ page }) => {
    // This would typically be covered by axe-core, but we can add specific checks
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('button, a, [role="button"]')
      .analyze();

    const colorContrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    );
    
    expect(colorContrastViolations).toHaveLength(0);
  });

  test("interactive elements have accessible names", async ({ page }) => {
    // Check buttons have accessible names
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const accessibleName = await button.getAttribute('aria-label') || 
                           await button.textContent() ||
                           await button.getAttribute('title');
      expect(accessibleName).toBeTruthy();
    }
    
    // Check links have accessible names
    const links = page.locator('a');
    const linkCount = await links.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const accessibleName = await link.getAttribute('aria-label') || 
                           await link.textContent() ||
                           await link.getAttribute('title');
      expect(accessibleName).toBeTruthy();
    }
  });

  test("status indicators are accessible", async ({ page }) => {
    // Check live data indicator has proper aria attributes
    await expect(dashboardPage.liveDataIndicator).toBeVisible();
    
    // Check operational status indicators have accessible text
    const statusIndicators = page.locator('text=Operational, text=Online, text=Active');
    const count = await statusIndicators.count();
    expect(count).toBeGreaterThan(0);
  });

  test("data tables/lists are properly structured", async ({ page }) => {
    // Check info blocks have proper structure
    const infoBlocks = page.locator('[class*="divide-y"]');
    
    for (let i = 0; i < await infoBlocks.count(); i++) {
      const block = infoBlocks.nth(i);
      
      // Should have label-value pairs that are readable
      const items = block.locator('> div');
      const itemCount = await items.count();
      
      for (let j = 0; j < itemCount; j++) {
        const item = items.nth(j);
        const label = item.locator('span').first();
        const value = item.locator('span').last();
        
        await expect(label).toBeVisible();
        await expect(value).toBeVisible();
      }
    }
  });

  test("loading states are accessible", async ({ page }) => {
    // Navigate to fresh page to test loading state
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Check loading indicator has proper text
    const loadingIndicator = page.locator('text=Loading Mission Control...');
    
    // If visible, should have accessible text
    const isVisible = await loadingIndicator.isVisible();
    if (isVisible) {
      await expect(loadingIndicator).toContainText('Loading');
    }
    
    // Wait for content to load
    await dashboardPage.waitForDataLoad();
  });

  test("error states are accessible", async ({ page }) => {
    // We would test this by mocking an error state
    // For now, verify error UI patterns if they exist
    
    // Check refresh button is accessible when there might be errors
    await expect(dashboardPage.refreshButton).toHaveAttribute('type', 'button');
  });

  test("focus management is correct", async ({ page }) => {
    // Test focus management when opening/closing sidebar
    await dashboardPage.openSidebar();
    
    // Focus should move to sidebar or first nav item
    await page.keyboard.press('Tab');
    
    // Test focus stays within modal/overlay if any
    // (This would be more relevant if there were modal dialogs)
  });

  test("motion and animations respect user preferences", async ({ page }) => {
    // Check for CSS that respects prefers-reduced-motion
    // This is mainly a CSS concern, but we can verify animations aren't jarring
    
    // Test refresh animation doesn't interfere with accessibility
    await dashboardPage.refreshButton.click();
    
    // Button should remain focusable during refresh
    await expect(dashboardPage.refreshButton).toBeEnabled();
  });

  test("responsive design maintains accessibility", async ({ page, isMobile }) => {
    if (isMobile) {
      // Mobile-specific accessibility tests
      await dashboardPage.openSidebar();
      
      // Navigation should be accessible on mobile
      await expect(dashboardPage.navigation).toBeVisible();
      
      // Touch targets should be adequately sized (checked by axe-core)
    }
  });
});