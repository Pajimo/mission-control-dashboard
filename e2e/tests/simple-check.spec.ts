import { test, expect } from "@playwright/test";

test.describe("Simple Page Check", () => {
  test("inspect page structure", async ({ page }) => {
    console.log("Navigating to dashboard...");
    await page.goto('/');
    
    console.log("Waiting for load...");
    await page.waitForLoadState('networkidle');
    
    console.log("Taking screenshot...");
    await page.screenshot({ path: 'page-inspection.png', fullPage: true });
    
    console.log("Getting title...");
    const title = await page.title();
    console.log("Page title:", title);
    
    console.log("Looking for loading state...");
    const loadingText = await page.locator('text=Loading Mission Control').isVisible();
    console.log("Loading visible:", loadingText);
    
    if (loadingText) {
      console.log("Page is still loading, waiting longer...");
      await page.waitForTimeout(5000);
      
      console.log("Check if data loaded...");
      const dataLoaded = await page.locator('text=OpenClaw Mission Control').isVisible();
      console.log("Data loaded:", dataLoaded);
      
      // Check what's actually on the page
      const bodyText = await page.locator('body').textContent();
      console.log("Body text sample:", bodyText?.substring(0, 500));
    }
    
    // Check for any error states
    const errorText = await page.locator('text=Error').isVisible();
    console.log("Error visible:", errorText);
    
    expect(title).toContain('OpenClaw Mission Control');
  });
});