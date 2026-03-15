import { Page, Locator } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly header: Locator;
  readonly title: Locator;
  readonly refreshButton: Locator;
  readonly liveDataIndicator: Locator;
  readonly sidebarToggle: Locator;
  readonly navigation: Locator;
  readonly metricsCards: Locator;
  readonly organizationalOverview: Locator;
  readonly workloadInfoBlock: Locator;
  readonly performanceInfoBlock: Locator;
  readonly gatewayHealthBlock: Locator;
  readonly activeSessions: Locator;
  readonly recentActivity: Locator;
  readonly activeProjects: Locator;
  readonly systemStatusBar: Locator;
  
  // Navigation elements
  readonly navDashboard: Locator;
  readonly navAgents: Locator;
  readonly navOrgChart: Locator;
  readonly navTeams: Locator;
  readonly navActivity: Locator;
  readonly navSystemStatus: Locator;
  readonly navRefresh: Locator;

  // Organizational structure elements
  readonly softwareDepartment: Locator;
  readonly contentDepartment: Locator;
  readonly mercorDivision: Locator;
  readonly ceoOverview: Locator;
  readonly viewFullChartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Header elements
    this.header = page.locator('header');
    this.title = page.getByRole('heading', { name: /OpenClaw Mission Control/i });
    this.refreshButton = page.getByRole('button', { name: /Refresh/ });
    this.liveDataIndicator = page.getByText('Live Data Active');
    this.sidebarToggle = page.getByRole('button').filter({ has: page.locator('svg').first() });
    
    // Navigation
    this.navigation = page.locator('nav');
    this.navDashboard = page.getByRole('link', { name: /Dashboard/ });
    this.navAgents = page.getByRole('link', { name: /Agents/ });
    this.navOrgChart = page.getByRole('link', { name: /Org Chart/ });
    this.navTeams = page.getByRole('link', { name: /Teams/ });
    this.navActivity = page.getByRole('button', { name: /Activity/ });
    this.navSystemStatus = page.getByRole('button', { name: /System Status/ });
    this.navRefresh = page.getByRole('button', { name: /Refresh Data/ });
    
    // Main content areas
    this.metricsCards = page.locator('[class*="grid"] > div').filter({ has: page.locator('[class*="font-heading"]') });
    this.organizationalOverview = page.locator('text=Organizational Structure').locator('..');
    this.workloadInfoBlock = page.locator('text=Workload').locator('..');
    this.performanceInfoBlock = page.locator('text=Performance').locator('..');
    this.gatewayHealthBlock = page.locator('text=Gateway Health').locator('..');
    this.activeSessions = page.locator('text=Active Sessions').locator('..');
    this.recentActivity = page.locator('[data-activity]');
    this.activeProjects = page.locator('text=Active Projects').locator('..');
    this.systemStatusBar = page.locator('[data-status]');

    // Organizational structure
    this.softwareDepartment = page.locator('text=Software Department').locator('..');
    this.contentDepartment = page.locator('text=Content Department').locator('..');
    this.mercorDivision = page.locator('text=Mercor Division').locator('..');
    this.ceoOverview = page.locator('text=MideSquare (CEO)').locator('..');
    this.viewFullChartButton = page.getByRole('link', { name: /View Full Chart/ });
  }

  async goto() {
    await this.page.goto('/');
  }

  async waitForDataLoad() {
    // Wait for the loading spinner to disappear and data to be present
    await this.page.waitForSelector('text=Loading Mission Control...', { state: 'hidden', timeout: 15000 });
    await this.title.waitFor({ state: 'visible' });
    await this.liveDataIndicator.waitFor({ state: 'visible' });
  }

  async refreshData() {
    await this.refreshButton.click();
    // Wait for refresh to complete
    await this.page.waitForTimeout(1000);
  }

  async openSidebar() {
    await this.sidebarToggle.click();
  }

  async navigateToSection(section: 'activity' | 'system-status') {
    if (section === 'activity') {
      await this.navActivity.click();
    } else if (section === 'system-status') {
      await this.navSystemStatus.click();
    }
  }

  async getMetricValues() {
    const metrics = [];
    const cards = await this.metricsCards.all();
    
    for (const card of cards) {
      const title = await card.locator('[class*="uppercase"]').textContent();
      const value = await card.locator('[class*="font-heading"]').textContent();
      metrics.push({ title: title?.trim(), value: value?.trim() });
    }
    
    return metrics;
  }

  async getActiveSessionsCount() {
    const sessionsHeader = await this.activeSessions.locator('h3').textContent();
    const match = sessionsHeader?.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  async getDepartmentStatuses() {
    const departments = [];
    
    // Software Department
    const softwareStatus = await this.softwareDepartment.locator('text=Operational').isVisible();
    departments.push({ name: 'Software', operational: softwareStatus });
    
    // Content Department  
    const contentStatus = await this.contentDepartment.locator('text=Operational').isVisible();
    departments.push({ name: 'Content', operational: contentStatus });
    
    // Mercor Division
    const mercorStatus = await this.mercorDivision.locator('text=Operational').isVisible();
    departments.push({ name: 'Mercor', operational: mercorStatus });
    
    return departments;
  }

  async getSystemHealth() {
    const statusText = await this.systemStatusBar.textContent();
    return {
      cpuUsage: statusText?.match(/CPU: (\d+)%/)?.[1],
      memoryUsage: statusText?.match(/Memory: (\d+)%/)?.[1],
      networkStatus: statusText?.match(/Network: (\w+)/)?.[1],
      uptime: statusText?.match(/Uptime: ([^|]+)/)?.[1]?.trim()
    };
  }

  async scrollToSection(section: 'organizational' | 'activity' | 'status') {
    if (section === 'organizational') {
      await this.organizationalOverview.scrollIntoView();
    } else if (section === 'activity') {
      await this.recentActivity.scrollIntoView();
    } else if (section === 'status') {
      await this.systemStatusBar.scrollIntoView();
    }
  }
}