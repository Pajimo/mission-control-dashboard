import { test, expect } from "@playwright/test";

test.describe("Debug Tests", () => {
  test("can access the dashboard", async ({ page }) => {
    console.log("Navigating to dashboard...");
    await page.goto('/');
    
    console.log("Waiting for page to load...");
    await page.waitForLoadState('networkidle');
    
    console.log("Taking screenshot...");
    await page.screenshot({ path: 'debug-screenshot.png' });
    
    console.log("Getting page content...");
    const content = await page.content();
    console.log("Page length:", content.length);
    console.log("Title:", await page.title());
    
    // Check if we have any basic HTML elements
    const bodyText = await page.locator('body').textContent();
    console.log("Body text preview:", bodyText?.substring(0, 200));
    
    // Just verify we got some content
    expect(content.length).toBeGreaterThan(100);
  });
});